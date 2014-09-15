define( function( require ) {

	var Marionette 		= require( 'marionette' );
	var _				= require( 'underscore' );

	//TEMPLATE
	var tmplAside = require( 'text!/templates/aside.html' );

	options = {};
	var AsideView = Marionette.ItemView.extend({
		template: _.template( tmplAside )
		, tagName: 'aside'
		, initialize: function( items ) {
			
		}
		, render: function() {
			this.$el.html( this.template( options ) );
			console.log("Aside Rendered!");
			return this;
		}
	});
	return AsideView;
});