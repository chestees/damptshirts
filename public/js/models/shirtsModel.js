define( function( require ) {

	var Backbone = require( 'backbone' );

	var ShirtsModel = Backbone.Model.extend({
		urlRoot: 'api/product/'
		, defaults: {
			'thumbs': 0,
		}
		, initialize: function( options ) {
			console.log('Shirt Model Rendered' );
		}
		, idAttribute: 'dampId'
	});

	return ShirtsModel;
});