define( function( require ) {

	var Marionette 		= require( 'marionette' );

	var ShirtsLayout = require( 'js/views/shirtsLayout' );

	//TEMPLATE
	var tmplHeader = require( 'text!/templates/header.html' );

	options = {};
	var HeaderView = Marionette.ItemView.extend({
		template: _.template( tmplHeader )
		, ui: {
			'logo': '#logo'
		}
		, events: {
			'click @ui.logo': 'showHome'
		}
		, initialize: function( options ) {
			this.app = options;
		}
		, render: function() {
			this.$el.html( this.template( options ) );
			console.log("Header Rendered!");
			return this;
		}
		, showHome: function() {
			app.mainLayout.content.show( new ShirtsLayout( this.app ) );
			app.router.navigate( '/' );
		}
	});

	return HeaderView;
});