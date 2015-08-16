define( function( require ) {

	var Backbone = require( 'backbone' );

	var vendorCollection = Backbone.Collection.extend({
		url: 'api/vendors'
		, initialize: function( options ) {
			console.log('Vendors Rendered' );
		}
		, idAttribute: 'vendorId'
	});

	return vendorCollection;
});