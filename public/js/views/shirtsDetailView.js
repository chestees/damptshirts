define( function( require ) {
	
	var Marionette = require( 'marionette' );
	var Handlebars = require( 'handlebars' );

	var tmplDetail = require( 'text!templates/detail.html' );

	var ShirtsDetailView = Marionette.LayoutView.extend({
		template: Handlebars.compile( tmplDetail )
		, templateHelpers: function() {
			return {
				image: this.imageSize()
			}
		}
		, className: 'detail container-fluid'
		, regions: {
			tags: '.tags'
			, social: '.social'
		}
		, initialize: function( options ) {
			this.model = options.model;
		}
		, onRender: function() {
			
		}
		, imageSize: function() {
			var imageLg;
			var imageSm;
			if( this.model.get( 'imageLg' ) ) {
				imageLg = this.model.get( 'imageLg' );
			}
			
			imageSm = this.model.get( 'image' );

			!imageLg ? image = imageSm : image = imageLg;

			return image;
		}
	});

	return ShirtsDetailView;
});