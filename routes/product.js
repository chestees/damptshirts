var sql = require( 'mssql' ),
	_   = require('underscore');

module.exports = function( app ) {
    sql.connect( config, _.bind( function( err ) {
		if( err ) {
			console.log("ERR: " + err );
		}

		// Product query by SLUG
		app.use( '/api/product/:dampId', function( req, res ) {

			var product = new sql.Request();

			product.input('DampId', sql.Int, req.params.dampId );

			// product.query( 'SElECT * FROM tblDampProducts WHERE dampId = @DampId; SELECT * FROM tblDampTags T INNER JOIN relDampProductToTag R ON T.tagId = R.tagId WHERE dampId = @DampId'
			product.execute( 'usp_Damp_Product', _.bind( function( err, recordset, returnValue ) {
				
				// console.log( '1: ' + JSON.stringify( recordset[0] ) + '\n');
				// console.log( '2: ' + JSON.stringify( recordset[1] ) + '\n' );
				
				app.product      = recordset[0][0];
				app.product.tags = recordset[1];

				// console.log('Length: ' + recordset.length); // count of recordsets returned by the procedure 
				// console.log('Length [0]: ' + recordset[0].length); // count of rows contained in first recordset 
				// console.log(returnValue); // procedure return value 
				// console.log(recordset.returnValue); // same as previous line 

				if( err ) {
					console.log("Error: " + err );
				} else {
					res.send( app.product );
				}
			}, this ) );

			// var tags = new sql.Request();
			// tags.input('DampId', sql.Int, this.dampId);

			// tags.execute('usp_Damp_Tags').then( function( recordset ) {
			// 	app.product[0].tags = recordset[0];

			// 	// console.log(recordset.length); // count of recordsets returned by the procedure 
			// 	// console.log(recordset[0].length); // count of rows contained in first recordset 
			// 	// console.log(returnValue); // procedure return value 
			// 	// console.log(recordset.returnValue); // same as previous line 
			// 	// console.log(recordset[0]); 

			// 	if( err ) {
			// 		console.log("Error: " + err );
			// 	}
			// 	if( app.product[0].tags ) {
			// 		// res.send( app.product );
			// 	}
			// });
			// console.log(app.product)
			// app.product = this.product;
			
		});
	}, this ) );
};