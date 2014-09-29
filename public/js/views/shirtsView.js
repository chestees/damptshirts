define( function( require ) {
	
	var Marionette		= require( 'marionette' );
	var Velocity        = require( 'velocity' );
	
	var ShirtCollection = require( 'js/collections/shirtCollection' );
	var ShirtModel      = require( 'js/models/shirtsModel.js' );

	var tmplThumbnail   = require( 'text!/templates/thumbnail.html' );

	var ShirtsView = Marionette.ItemView.extend({
		template: _.template( tmplThumbnail )
		, ui: {
			'thumbs': '.thumbs',
			'voteUp': '#vote-up',
			'voteDown': '#vote-down'
		}
		, events: {
			'mouseenter': 'showVoting',
			'mouseleave': 'hideVoting',
			'click @ui.voteUp': 'voteUp',
			'click @ui.voteDown': 'voteDown'
		}
		, className: 'product-image'
		, initialize: function( options ) {
			console.log("Shirt View initiated");
			this.listenTo(this.model, "change", this.render);
		}
		, showVoting: function() {
			this.ui.thumbs.velocity({ opacity: 1, duration: 100 }, { display: "block" });
		}
		, hideVoting: function() {
			this.ui.thumbs.velocity({ opacity: 0 }, { display: "none" });
		}
		, voteUp: function() {
			var thumbs = this.model.get( 'thumbs' ) + 1;
			this.model.set( 'id', this.model.get("_id") );
			this.model.save( {'thumbs': thumbs}, {patch: true} );
		}
		, voteDown: function() {
			var thumbs = this.model.get( 'thumbs' ) - 1;
			this.model.set( 'id', this.model.get("_id") );
			this.model.save( {'thumbs': thumbs}, {patch: true} );
		}
	});

	return ShirtsView;
});