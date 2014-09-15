define( function( require ) {

	var Backbone = require( 'backbone' );

	var ShirtsModel = Backbone.Model.extend({
	 	urlRoot: '/api/shirts'
	 	, defaults: {
	    	'_id':         '0', 
	    	'link':        '',
	    	'title':       'N/A',
	    	'diggStoreId': 0,
	    	'Slug':        '',
	    	'image':       "http://9.media.bustedtees.cvcdn.com/2/-/bustedtees.f89dd352-75b0-44a2-9838-5526592a.gif"
	  	}
	  	, initialize: function() {
	  		console.log('Shirt Model Rendered' );
	  	}
	});

	return ShirtsModel;
});