define( function( require ) {

	var Backbone = require( 'backbone' );

	var ShirtsModel = Backbone.Model.extend({
	 	urlRoot: '/api/shirts'
	  	// , idAttribute: '_id'
	  	, initialize: function() {
	  		console.log('Shirt Model Rendered' );
	  	}
	});

	return ShirtsModel;
});