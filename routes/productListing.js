var sql = require( 'mssql' ),
	_   = require('underscore');

module.exports = function( app ) {
    sql.connect( config, _.bind( function( err ) {
		if( err ) {
			console.log("ERR: " + err );
		}

		// Product listing
		app.use( '/api/products', function( req, res ) {

			var productListing = new sql.Request();

			productListing.input('TagID', sql.Int, 0);
			productListing.input('Search', sql.NVarChar, 0);
			productListing.input('SiteName', sql.NVarChar, 'damptshirts');
			productListing.input('PageNumber', sql.NVarChar, 1);
			productListing.input('RowspPage', sql.NVarChar, 50);
			
			productListing.execute( 'usp_Damp_Products', function( err, recordset, returnValue ) {
				app.productListing = recordset[0];
				res.send( app.productListing );

				// console.log(recordset.length); // count of recordsets returned by the procedure 
				// console.log(recordset[0].length); // count of rows contained in first recordset 
				// console.log(returnValue); // procedure return value 
				// console.log(recordset.returnValue); // same as previous line 
				
				if( err ) {
					console.log("Error: " + err );
				}
			});
		});
	}, this ) );
};