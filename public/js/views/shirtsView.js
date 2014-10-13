define( function( require ) {
	
	var Marionette		= require( 'marionette' );

	var ShirtCollection = require( 'js/collections/shirtCollection' );
	var ShirtModel      = require( 'js/models/shirtsModel.js' );

	var tmplThumbnail   = require( 'text!/templates/thumbnail.html' );

	var ShirtsView = Marionette.ItemView.extend({
		template: _.template( tmplThumbnail )
		, ui: {
			'thumbs': '.thumbs',
			'productImage': '.product-image',
			'voteUp': '.vote-up',
			'voteDown': '.vote-down'
		}
		, events: {
			'mouseenter': 'showVoting',
			'mouseleave': 'hideVoting',
			'click @ui.voteUp': 'voteUp',
			'click @ui.voteDown': 'voteDown'
		}
		, templateHelpers: function() {
			return {
				thumbs: this.thumbs
			}
		}
		, className: 'product-image'
		, initialize: function( options ) {
			console.log("Shirt View initiated");
			
			this.listenTo(this.model, "change", this.render);
		}
		, showVoting: function() {
			$( this.el ).popover({
				content: this.voteContent( this.model ),
				placement: 'top',
				container: $( this.el ),
				html: true,
				delay: { show: 500, hide: 100 }
			});
			$( this.el ).popover('show');
			$( this.ui.productImage ).css('background-color', '#b93636');
		}
		, hideVoting: function() {
			$( this.el ).popover('hide');
			$( this.ui.productImage ).css('background-color', 'transparent');
		}
		, voteContent: function( model ) {
			var content = "<div class='thumbs' data-id='" + model.get( '_id' ) + "'> \
				<div class='btn btn-danger vote-down'> \
					<span class='txt'>Meh</span> \
				</div> \
				<div class='btn btn-primary l_margin_5 vote-up'> \
					<span class='txt'>Like</span> \
				</div> \
				<div class='like-score'>Score: " + model.get( 'thumbs' ) + "</div> \
				<div class='like-score'>Score: " + model.get( 'dateAdded' ) + "</div> \
			</div>"

			return content;
		}
		, voteUp: function() {
			var thumbs = this.model.get( 'thumbs' ) + 1;
			//this.model.set( 'id', this.model.get("_id") );
			this.model.save( { 'thumbs': thumbs }, { patch: true } );
		}
		, voteDown: function() {
			var thumbs = this.model.get( 'thumbs' ) - 1;
			//this.model.url( '/api/vote');
			//this.model.set( 'id', this.model.get("_id") );
			this.model.save( {'thumbs': thumbs}, {patch: true} );
		}
	});

	return ShirtsView;
});