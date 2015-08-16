define( function( require ) {
	
	var Marionette      = require( 'marionette' );
	var Handlebars      = require( 'handlebars' );

	var tmplTags = require( 'text!templates/tags.html' );

	var TagsView = Marionette.ItemView.extend({
		template: Handlebars.compile( tmplTags )
		, className: 'tag'
		, initialize: function( options ) {
			console.log("Tags List");
		}
	});

	return TagsView;
});