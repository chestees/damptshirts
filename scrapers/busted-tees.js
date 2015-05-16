var request     = require('request'),
	_           = require('underscore'),
	cheerio     = require('cheerio'),
	fs          = require('fs'),
	slugConvert = require('../lib/slugConvert'),
	saveImage   = require('../lib/saveImage');

module.exports = function( app ) {
	app.get( '/scrape/busted-tees', function( req, res ) {
		res.write( '<html><head>' );
		res.write( '<title>Busted Tees Scraper</title>' )
		res.write( '<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.css">' );
		res.write( '<link rel="stylesheet" type="text/css" href="/css/style.css">' );
		res.write( '<body>' );
		res.write( '<div class="container-fluid">' );
		res.write( '<h1>Busted Tees Designs</h1>' );
		res.write( '<main>' );
		res.write( '<table class="table table-striped">' );

		var json = [];
		var limit = 3;
		var counter = 0;
		var interval = 5 * 1000;

		url = 'http://www.bustedtees.com/homepage/all-categories/all-colors/all-styles/all-sizes/1/512';

		request( url, _.bind( function( error, response, html ) {
			if ( !error ) {
				var $ = cheerio.load( html );
				var title, image, filename, extension, slug, fileSavePath, filePath;
				var num = $( 'a img.visible-xs' ).length;
				console.log("Count: " + num);

				res.write( '<tr>' );
				res.write( '<td colspan="2">' );
				res.write( '<h3>Building the JSON</h3>' );
				res.write( '<div>' + url + '</div>');
				res.write( '</td>' );
				res.write( '</tr>' );

				$( 'a img.visible-xs' ).each( function() {
					title = $( this ).attr( 'alt' );
					image = $( this ).attr( 'src' );
					console.log( 'Title: ' + title );
					console.log( 'Image: ' + image );

					if( title && image ) {
						originalLocation    = image;
						extension    = image.split('.').pop();
						slug         = slugConvert( title );
						filename     = slug + '.' + extension;
						fileSavePath = 'public/img/uploads/busted-tees/thumbnails/' + filename;
						filePath     = '/img/uploads/busted-tees/thumbnails/' + filename;

						// Build the JSON File
						var JSONRecord = {
							'originalLocation': originalLocation,
							'filePath': filePath,
							'filename': filename,
							'title': title,
							'slug': slug,
							'fileSavePath': fileSavePath
						};
						json.push( JSONRecord );

					} else {
						console.log( 'Something is missing on page' );
						false;
					}
				});

				
				fs.writeFile('public/bustedTeesPages.json', JSON.stringify( json, null, 4 ), function( err ) {
					console.log('File successfully written! - Check your project directory for the bustedTeesPages.json file');

					res.write( '<tr>' );
					res.write( '<td colspan="2">' );
					res.write( '<h3>File successfully written! - Check your project directory for the bustedTeesPages.json file</h3>' );
					res.write( '</td>' );
					res.write( '</tr>' );
				});

				var callInterval = setInterval( function() {
					if( counter <= limit ) {
						var originalLocation = json[ counter ].originalLocation;
						var fileSavePath     = json[ counter ].fileSavePath;
						var filePath         = json[ counter ].filePath;
						var title            = json[ counter ].title;
						var slug             = json[ counter ].slug;

						filestream = fs.createWriteStream( fileSavePath );
						request( originalLocation ).pipe( filestream );

						console.log("File Stream: " + filestream );
						console.log("Original Location: " + originalLocation );

						filestream.on( 'close', function() {
							res.write( '<tr>' );
							res.write( '<td><img src="' + filePath + '" /></td>' );
							res.write( '<td>' );
							res.write( '<h3>' + title + '</h3>' );
							res.write( '<div>' + slug + '</div>');
							res.write( '</td>' );
							res.write( '</tr>' );
						});
						counter++;
					} else {
						clearInterval( callInterval );
						res.write( '<tr>' );
						res.write( '<td colspan="2">' );
						res.write( '<h3>All Done</h3>' );
						res.write( '</td>' );
						res.write( '</tr>' );
						res.write( '</table>' );
						res.write( '</main>' );
						res.end( '</body></html>' );
					}
				}, interval );

			} else {
				console.log( 'Url Error: ' + error );
			}
		}, this ) );
	} );
};