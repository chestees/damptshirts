var request     = require('request'),
	cheerio     = require('cheerio'),
	fs          = require('fs'),
	slugConvert = require('../lib/slugConvert'),
	saveImage   = require('../lib/saveImage');

module.exports = function( app ) {
	app.get( '/scrape/threadless', function( req, res ) {
		res.write( '<html><head>' );
		res.write( '<title>Threadless Scraper</title>' )
		res.write( '<link rel="stylesheet" type="text/css" href="/bower_components/bootstrap/dist/css/bootstrap.css">' );
		res.write( '<link rel="stylesheet" type="text/css" href="/css/style.css">' );
		res.write( '<body>' );
		res.write( '<div class="container-fluid">' );
		res.write( '<h1>Threadless Designs</h1>' );
		res.write( '<main>' );
		res.write( '<table class="table table-striped">' );

		json = [];
		counter = 1;
		limit = 15;
		var interval = 5000;

		var callURLs = setInterval( function() {
			url = 'https://www.threadless.com/product/' + counter;

			request( url, function( error, response, html ) {
				if ( !error ) {
					counter ++;
					
					var $ = cheerio.load( html );
					var title, image, artist, filename, thumbnail, extension, slug, color, fileSavePath, filePath;
					var imgLarge = '636x460design_01.jpg';
					var imgSmall = '200x210design_01.jpg';

					// Get title
					$( 'h1' ).filter( function() {
						var data = $( this );
						title = data.text();
					});
					if( !title ) {
						title = 'Title unknown'
					}

					// Get large image
					$( '.design' ).filter( function() {
						var data = $( this );
						image = data.attr( 'href' );
					});
					if( !image ) {
						image = 'Image unknown'
					}

					// Get artist
					$( '.designer_info dd a' ).first().filter( function() {
						var data = $( this );
						artist = data.text();
					});
					if( !artist ) {
						artist = 'Artist unknown'
					}

					// Get color
					$( '.item_group p' ).first().filter( function() {
						var data = $( this );
						color = data.text().replace(' size info', '');
					});
					if( !color ) {
						color = 'Color unknown'
					}

					if( title && image && artist && color ) {
						// Save images
						// 200x210design_01.jpg
						// 636x460design_01.jpg
						thumbnail    = 'https://www.threadless.com/imgs/products/' + global.counter + '/' + imgSmall;
						extension    = image.split('.').pop();
						slug         = slugConvert( title );
						filename     = slug + '.' + extension;
						fileSavePath = 'public/img/uploads/threadless/200x210/' + filename;
						filePath     = '/img/uploads/threadless/200x210/' + filename;

						imageLg  = 'https://www.threadless.com/imgs/products/' + global.counter + '/' + imgLarge;
						fileSavePathImageLg = 'public/img/uploads/threadless/636x460/' + filename;
						filePathImageLg = '/img/uploads/threadless/636x460/' + filename;

						var saveOptions = {
							'thumbnail': thumbnail
							, 'fileSavePathThumbnail': fileSavePath
							, 'imageLg': imageLg
							, 'fileSavePathImageLg': fileSavePathImageLg
						}

						saveImage( saveOptions, function() {
							res.write( '<tr>' );
							res.write( '<td><img src="' + filePath + '" /></td>' );
							res.write( '<td>' );
							res.write( '<h3>' + title + '</h3>' );
							res.write( '<div>' + global.url + '</div>');
							res.write( '<div>' + slug + '</div>');
							res.write( '<div>' + artist + '</div>');
							res.write( '<div>' + color + '</div>');
							res.write( '</td>' );
							res.write( '</tr>' );
						});

						if( counter === limit + 1 ) {
							res.write( '</table>' );
							res.write( '</main>' );
							res.end( '</body></html>' );
						}

						// Build the JSON File
						var JSONRecord = { 
							'url': global.url,
							'thumbnail': filePath,
							'imageLg': filePathImageLg,
							'filename': filename,
							'artist': artist,
							'title': title,
							'slug': slug,
							'color': color
						};
						json.push( JSONRecord );
						console.log( "URL: " + global.url );
					} else {
						console.log( 'Something is missing on page' );
					}
				} else {
					console.log( 'Url Error: ' + error );
				}
				//Write the JSON file
				if( counter === limit + 1 ) {
					fs.writeFile('public/threadlessPages.json', JSON.stringify( json, null, 4 ), function( err ) {
						console.log('File successfully written! - Check your project directory for the threadlessPages.json file');
					});
					clearInterval( callURLs );
				}
			} );
		}, interval );
	});
};