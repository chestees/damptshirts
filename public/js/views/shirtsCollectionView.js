define( function( require ) {
	
	var Marionette		= require( 'marionette' );
	var ShirtsView	    = require( 'js/views/shirtsView' );
	
	var ShirtsCollectionView = Marionette.CollectionView.extend({
		itemView: ShirtsView
		, id: 'shirts'
	});

	return ShirtsCollectionView;
});