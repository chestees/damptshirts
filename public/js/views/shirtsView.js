define( function( require ) {
	
	var Marionette		= require( 'marionette' );
	var ShirtCollection      = require( 'js/collections/shirtCollection' );
	var tmplThumbnail = require( 'text!/templates/thumbnail.html' );

	var ShirtsView = Marionette.ItemView.extend({
		template: _.template( tmplThumbnail )
		, ui: {
			'product': '.Product_Image'
			, 'productLink': '.product-link'
		}
		, events: {
			'click @ui.productLink': 'showDetails'
		}
		, className: 'Product'
		, initialize: function( options ) {
			console.log("Shirt View initiated");
			
			//this.listenTo(this.model, "change", this.render);
		}
	});

	return ShirtsView;
});