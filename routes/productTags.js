var sql = require( 'mssql' ),
	_   = require('underscore');

module.exports = function( app ) {
    sql.connect( config, _.bind( function( err ) {
		if( err ) {
			console.log("ERR: " + err );
		}

		// Product listing
		app.use( '/api/tags/:dampId', function( req, res ) {

			var tags = new sql.Request();

			tags.input('DampId', sql.Int, req.params.dampId);

			tags.execute('usp_Damp_Tags', function( err, recordset, returnValue ) {
					app.tags = recordset[0];
					res.send( app.tags );

console.log(recordset.length); // count of recordsets returned by the procedure 
console.log(recordset[0].length); // count of rows contained in first recordset 
console.log(returnValue); // procedure return value 
console.log(recordset.returnValue); // same as previous line 

					if( err ) {
						console.log("Error: " + err );
					}
				}
			);
		});
	}, this ) );
};