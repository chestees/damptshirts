define( function( require ) {

	var Backbone = require( 'backbone' );

	var TagsCollection = Backbone.Collection.extend({
		url: 'api/tags'
		, idAttribute: 'tagId'
	});

	return TagsCollection;
});