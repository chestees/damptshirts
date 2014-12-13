define( function( require ) {
	
	var Marionette      = require( 'marionette' );

	var tmplTags = require( 'text!/templates/tags.html' );

	var TagsView = Marionette.ItemView.extend({
		template: _.template( tmplTags )
		, className: 'tag-list'
		, initialize: function( options ) {
			console.log("Tags List");
		}
	});

	return TagsView;
});