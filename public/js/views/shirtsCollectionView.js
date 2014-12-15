define( function( require ) {
	
	var Marionette = require( 'marionette' );
	var ShirtsView = require( 'js/views/shirtsView' );
	
	var ShirtsCollectionView = Marionette.CollectionView.extend({
		childView: ShirtsView
		, initialize: function( options ) {
			this.app = options;
			this.collection = this.app.collection;
			this.listenTo( this.collection, "sort", this.render );
		}
		, childViewOptions: function() {
			maxWidth = ( this.app.mainLayout.content.$el.width() ) / 6;
			return {
				maxWidth: maxWidth
			}
		}
		, id: 'shirts'
	});

	return ShirtsCollectionView;
});