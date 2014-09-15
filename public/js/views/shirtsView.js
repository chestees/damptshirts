define( function( require ) {
	
	var Marionette		= require( 'marionette' );
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
			this.listenTo(this.model, "change", this.render);
		}
		, showDetails: function( e ){
	        var id = $(e.currentTarget).data("id");
	        var myModel = this.model;
	        console.log(myModel);
	        require( [ 'js/views/shirtsDetailView' ], function( ShirtDetailView ) {
					shirtDetailView = new ShirtDetailView({
            		model: myModel
            	});
            	app.getRegion('body').currentView.content.show(shirtDetailView);
			});
	    }
	});

	return ShirtsView;
});