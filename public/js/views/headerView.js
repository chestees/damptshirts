define( function( require ) {

	var Marionette 		= require( 'marionette' );

	var ShirtsCollectionView = require( 'js/views/shirtsCollectionView' );

	//TEMPLATE
	var tmplHeader = require( 'text!templates/header.html' );

	options = {};
	var HeaderView = Marionette.ItemView.extend({
		template: _.template( tmplHeader )
		, className: 'container-fluid'
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
			return this;
		}
		, showHome: function() {
			this.app.router.home();
		}
	});

	return HeaderView;
});