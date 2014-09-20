define( function( require ) {
	
	var Marionette      = require( 'marionette' );

	//TEMPLATE
	var tmplDetail = require( 'text!/templates/detail.html' );

	var ShirtsDetailView = Marionette.ItemView.extend({
		template: _.template( tmplDetail )
		, templateHelpers: function() {
			return {
				image: this.imageSize()
			}
		}
		, className: '.detail'
		, initialize: function( options ) {
			console.log("DETAILS");
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