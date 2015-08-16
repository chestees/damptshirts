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
			var page           = req.query.Page || 3;
			var pageSize       = req.query.PageSize || 500;
			var orderBy        = req.query.OrderBy || 'dateAdded';
			var tagId          = req.query.TagId || 0;

			productListing.input( 'TagID', sql.Int, tagId );
			productListing.input( 'Search', sql.NVarChar, 0 );
			productListing.input( 'SiteName', sql.NVarChar, 'damptshirts' );
			productListing.input( 'Page', sql.Int, page );
			productListing.input( 'PageSize', sql.Int, pageSize );
			productListing.input( 'OrderBy', sql.NVarChar, orderBy );
			
			productListing.execute( 'usp_Damp_Products', function( err, recordset, returnValue ) {
				app = recordset[0];
				app.recordCount = recordset[1][0];
				
				// console.log( '1: ' + JSON.stringify( recordset[0] ) + '\n');
				// console.log( '2: ' + JSON.stringify( recordset[1][0] ) + '\n' );

				// console.log( 'Tag Id  : ' + tagId );
				// console.log( 'Order By: ' + orderBy );
				// console.log( '1: ' + JSON.stringify( recordset[0] ) + '\n');
				// console.log(recordset.length); // count of recordsets returned by the procedure 
				// console.log(recordset[0].length); // count of rows contained in first recordset 
				// console.log(returnValue); // procedure return value 
				// console.log(recordset.returnValue); // same as previous line 
				
				if( err ) {
					console.log("Error: " + err );
				} else {
					res.send( app );
				}
			});
		});
		app.use( '/api/count', function( req, res ) {
			res.send( app.recordCount );
		});
	}, this ) );
};