define( function( require ) {

	var Backbone    = require( 'backbone' );
	var ShirtsModel = require( 'js/models/shirtsModel' );

	var ShirtCollection = Backbone.Collection.extend({
		model: ShirtsModel
		, url: '/api/shirts'
		, initialize: function() {
			console.log('Shirt Collection Initialized');
			//this.listenTo(this.collection, "sort", this.renderCollection);
		}
	});

	return ShirtCollection;
});