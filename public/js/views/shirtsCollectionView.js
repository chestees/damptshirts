define( function( require ) {
	
	var Marionette		= require( 'marionette' );
	var ShirtsView	    = require( 'js/views/shirtsView' );
	
	var ShirtsCollectionView = Marionette.CollectionView.extend({
		itemView: ShirtsView
		, initialize: function() {
			this.listenTo(shirtCollection, "sort", this.render);
		}
		, id: 'shirts'
	});

	return ShirtsCollectionView;
});