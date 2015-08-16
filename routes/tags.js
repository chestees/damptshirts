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

			tags.execute( 'usp_Damp_Tags', function( err, recordset, returnValue ) {
				app.tags = recordset[0];
				res.send( app.tags );

				// console.log(recordset.length); // count of recordsets returned by the procedure 

				if( err ) {
					console.log("Error: " + err );
				}
			});
		});
	}, this ) );
};