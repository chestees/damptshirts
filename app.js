var express   = require('express'),
	serveStatic = require('serve-static'),
	request     = require('request'),
	_           = require('underscore'),
	cheerio     = require('cheerio'),
	fs          = require('fs'),
	sql         = require( 'mssql' );

app   = express();
config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME
}

app.use( serveStatic('public') );
app.set( 'port', ( process.env.PORT || 5000 ) );
app.listen( app.get( 'port' ), _.bind( function() {
	console.log( "Node app is running at localhost:" + app.get( 'port' ) );
}, this ) );

require( './routes/product' )( app );
require( './routes/productTags' )( app );
require( './routes/productListing' )( app );
require( './routes/tags' )( app );
require( './routes/tagRelations' )( app );
require( './routes/vendors' )( app );
require( './scrapers/threadless' )( app );
require( './scrapers/busted-tees' )( app );

app.get('/scrape/all', function(req, res){
	res.render( 'threadless' );
	url = 'http://www.threadless.com/all';

	request( url, function( error, response, html ) {
		if ( !error ) {
		    var $ = cheerio.load( html );

			var link, url, image;
			var json = [];
			var counter = 0;

			$( 'a' ).filter( function() {
				var data = $( this );
				counter++;

				if( counter < 10 ) {
					console.log("URL: " + data.attr( 'href' ) );
					console.log("IMAGE: https:" + data.children().attr( 'src' ) );

					url = data.attr( 'href' );
					image = data.children().attr( 'src' );

					// var filenameIndex = image.lastIndexOf( '/' ) + 1;
					// var filename = image.substr( filenameIndex );
					// console.log("FILENAME: " + filename );
					var extension = image.split('.').pop();
					var urlIndex = url.lastIndexOf( '/' ) + 1;
					var filename = url.substr( urlIndex ) + '.' + extension;
					console.log("FILENAME: " + filename );

					request( 'https:' + image ).pipe( fs.createWriteStream( 'public/img/uploads/threadless/200x210/' + filename ) )

					// Build the JSON File
					json.push( { 
						'url': url,
						'image': image,
						'filename': filename
					} );
				}
			});
		}

		fs.writeFile('threadless.json', JSON.stringify( json, null, 4 ), function( err ) {
			console.log('File successfully written! - Check your project directory for the output.json file');
		});
    });
});