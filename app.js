var express   = require('express'),
	restful     = require('node-restful'),
	mongoose    = restful.mongoose,
	serveStatic = require('serve-static'),
	request     = require('request'),
	_           = require('underscore'),
	cheerio     = require('cheerio'),
	fs          = require('fs'),
	exphbs      = require('express-handlebars');

var db    = mongoose.connection;
var app   = express();
var dbUrl = process.env.DATABASE_URL;

// app.use( bodyParser() );
app.use( serveStatic('public') );

app.set('port', ( process.env.PORT || 5000 ));

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});

app.engine('.hbs', exphbs( { 
	defaultLayout: 'main'
	, extname: '.hbs'
} ) );
app.set('view engine', '.hbs');

mongoose.connect( dbUrl );

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Connected to Database");
} );

var ShirtSchema = mongoose.Schema( {
	_id:         String,
	Link:        String,
	Title:       String,
	DiggStoreId: Number,
	Slug:        String,
	Image:       String,
	Thumbs:      Number
} );

var Shirts = restful.model( 'products3', ShirtSchema );
Shirts.methods( ['get', 'put', 'post', 'delete'] );
Shirts.register(app, '/api/shirts');

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

app.get('/scrape/count', function(req, res) {
	// res.render( 'threadless' );
	res.write( '<html><head>' );
	res.write( '<title>Threadless Scraper</title>')
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
					slug         = convertToSlug( title );
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

					saveImages( saveOptions, function() {
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
	}, 5000 );
});

function saveImages( options, callback ) {
	var imageLg        = options.imageLg;
	var imageLgPath    = options.fileSavePathImageLg;
	var imageThumb     = options.thumbnail;
	var imageThumbPath = options.fileSavePathThumbnail;
	var filestreamThumbnail;
	var filestreamImageLg;

	if( imageThumb ) {
		filestreamThumbnail = fs.createWriteStream( imageThumbPath );
		request( imageThumb ).pipe( filestreamThumbnail );
	}
	if( imageLg ) {
		filestreamImageLg = fs.createWriteStream( imageLgPath );
		request( imageLg ).pipe( filestreamImageLg );
	}
	
	filestreamThumbnail.on( 'close', function() {
		callback();
	});
}

function convertToSlug( Text ) {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        .replace('---', '-')
        .replace('--', '-');
}

app.use('/*', function  (req, res) {
  res.redirect('404.html');
} );