define( function( require ) {

	var Backbone    = require( 'backbone' );
	var ShirtsModel = require( 'js/models/shirtsModel' );

	var ShirtCollection = Backbone.Collection.extend({
		model: ShirtsModel
		// , url: 'http://damptshirts.herokuapp.com/api/shirts'
		, url: 'api/products'
		, initialize: function() {
			console.log('Shirt Collection Initialized');
			this.listenTo( this, "sort", this.render );
		}
		, comparator: function( model ) {
			return -model.get( 'thumbs' );
		}
	});

	return ShirtCollection;
});