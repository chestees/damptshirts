define( function( require ) {

	var Backbone = require( 'backbone' );

	var ShirtsModel = Backbone.Model.extend({
	 	urlRoot: '/api/shirts',
	 	defaults: {
			'title': '',
			'slug':  'temp-slug',
			'image': 'http://5.media.bustedtees.cvcdn.com/a/-/bustedtees.f96bd6ba-85ea-409f-abc0-d4df595e.gif',
			'thumbs': 0
		}
	  	, initialize: function() {
	  		console.log('Shirt Model Rendered' );
	  	}
	  	, idAttribute: '_id'
	});

	return ShirtsModel;
});