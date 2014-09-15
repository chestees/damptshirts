define( function( require ) {

	var Marionette 		= require( 'marionette' );
	var _				= require( 'underscore' );
	
	//TEMPLATE
	var tmplContent = require( 'text!/templates/article.html' );

	var ContentView = Marionette.ItemView.extend({
		template: _.template( tmplContent )
		, tagName: 'article'
		, initialize: function() {
		}
		, render: function() {
			console.log("Article Rendered!");
			return this;
		}
	});
	return ContentView;
});