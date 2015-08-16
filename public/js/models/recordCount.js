define( function( require ) {

	var Backbone = require( 'backbone' );

	var CountModel = Backbone.Model.extend({
		url: 'api/count'
		, initialize: function( options ) {
			
		}
	});

	return CountModel;
});