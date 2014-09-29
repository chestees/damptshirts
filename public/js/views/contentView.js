define( function( require ) {

	var Marionette 		= require( 'marionette' );
	var _				= require( 'underscore' );

	//TEMPLATE
	var tmplContent = require( 'text!/templates/article.html' );

	//this.sortBar.show( sortBar );

	var ContentView = Marionette.ItemView.extend({
		template: _.template( tmplContent )
		, tagName: 'article'
		, render: function() {
			console.log("Article Rendered!");
		}
	});
	return ContentView;
});