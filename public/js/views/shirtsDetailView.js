define( function( require ) {
	
	var Marionette = require( 'marionette' );

	var tmplDetail = require( 'text!/templates/detail.html' );

	var ShirtsDetailView = Marionette.ItemView.extend({
		template: _.template( tmplDetail )
		, templateHelpers: function() {
			return {
				image: this.imageSize()
			}
		}
		, className: 'modal fade'
		, initialize: function( options ) {
			this.model = options;
		}
		, onRender: function() {
			$( this.el ).modal('show')
		}
		, imageSize: function() {
			imageLg = this.model.get('imageLg');
			imageSm = this.model.get('image');

			!imageLg ? image = imageSm : image = imageLg;

			return image;
		}
	});

	return ShirtsDetailView;
});