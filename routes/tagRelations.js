var sql = require( 'mssql' ),
	_   = require('underscore');

module.exports = function( app ) {
    sql.connect( config, _.bind( function( err ) {
		if( err ) {
			console.log("ERR: " + err );
		}

		// List all tags
		app.use( '/api/tag/relations', function( req, res ) {

			var relations = new sql.Request();

			// tags.query("SELECT tagId, tag, slug FROM tblDampTags WHERE isNoShow IS NULL", function( err, recordset, returnValue ) {
			relations.query("SELECT dampId, tagId FROM relDampProductToTag", function( err, recordset, returnValue ) {
				app.relations = recordset;
				res.send( app.relations );

				// console.log(recordset.length); // count of recordsets returned by the procedure 

				if( err ) {
					console.log("Error: " + err );
				}
			});
		});
	}, this ) );
};