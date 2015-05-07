define( function( require ) {

	var Marionette 		= require( 'marionette' );

	var tmplAside = require( 'text!templates/aside.html' );

	var AsideView = Marionette.ItemView.extend({
		template: _.template( tmplAside )
		, render: function() {
			this.$el.html( this.template( options ) );
			console.log("Aside Rendered!");
			return this;
		}
	});
	return AsideView;
});