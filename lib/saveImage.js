var request = require('request'),
	fs      = require('fs');

module.exports = function saveImages( options, callback ) {
	var imageLg        = options.imageLg;
	var imageLgPath    = options.fileSavePathImageLg;
	var imageThumb     = options.thumbnail;
	var imageThumbPath = options.fileSavePathThumbnail;
	var filestreamThumbnail;
	var filestreamImageLg;
	// var uploadPromises = [];

	if( imageThumb ) {
		filestreamThumbnail = fs.createWriteStream( imageThumbPath );
		request( imageThumb ).pipe( filestreamThumbnail );
	}
	if( imageLg ) {
		filestreamImageLg = fs.createWriteStream( imageLgPath );
		request( imageLg ).pipe( filestreamImageLg );
	}
	
	// filestreamThumbnail.on( 'close', function() {
	// 	console.log("Close");
	// 	callback();
	// });
}