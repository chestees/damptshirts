var sql = require( 'mssql' ),
	_   = require('underscore');

module.exports = function( app ) {
    sql.connect( config, _.bind( function( err ) {
		if( err ) {
			console.log("ERR: " + err );
		}

		// List all tags
		app.use( '/api/tags', function( req, res ) {

			var tags = new sql.Request();

			// tags.query("SELECT tagId, tag, slug FROM tblDampTags WHERE isNoShow IS NULL", function( err, recordset, returnValue ) {
			tags.query("SELECT tagId, tag, slug, isNoShow FROM tblDampTags", function( err, recordset, returnValue ) {
				app.tags = recordset;
				res.send( app.tags );

				// console.log(recordset.length); // count of recordsets returned by the procedure 

				if( err ) {
					console.log("Error: " + err );
				}
			});
		});
	}, this ) );
};