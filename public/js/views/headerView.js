define( function( require ) {

	var Marionette 		= require( 'marionette' );
	var _				= require( 'underscore' );

	//TEMPLATE
	var tmplHeader = require( 'text!/templates/header.html' );

	options = {};
	var HeaderView = Marionette.ItemView.extend({
		template: _.template( tmplHeader )
		, tagName: 'header'
		, initialize: function() {
			
		}
		, render: function() {
			this.$el.html( this.template( options ) );
			console.log("Header Rendered!");
			return this;
		}
	});

	return HeaderView;
});