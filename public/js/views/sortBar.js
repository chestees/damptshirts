define( function( require ) {
	
	var Marionette  = require( 'marionette' );
	
	var tmplSortBar = require( 'text!/templates/sortBar.html' );

	var SortBar = Marionette.ItemView.extend({
		template: _.template( tmplSortBar )
		, ui: {
			'sortButton': '.btn-sort', 
			'mostRecent': '#mostRecent',
			'leastLiked': '#leastLiked',
			'mostLiked': '#mostLiked'
		}
		, events: {
			'click @ui.mostLiked': 'mostLiked',
			'click @ui.leastLiked': 'leastLiked',
			'click @ui.mostRecent': 'mostRecent'
		}
		, className: 'sort'
		, initialize: function( options ) {
			this.app = options;
			this.shirtCollection = this.app.collection;
		}
		, onRender: function() {
			this.setActive( this.ui.mostLiked );
		}
		, mostLiked: function() {
			this.shirtCollection.comparator = function( model ) {
				return -model.get('thumbs');
			}
			this.shirtCollection.sort();
			this.setActive( this.ui.mostLiked );
		}
		, leastLiked: function() {
			this.shirtCollection.comparator = 'thumbs';
			this.shirtCollection.sort();
			this.setActive( this.ui.leastLiked );
		}
		, mostRecent: function() {
			this.shirtCollection.comparator = function( model ) {
				return model.get('dateAdded');
			}
			this.shirtCollection.sort();
			this.setActive( this.ui.mostRecent );
		}
		, setActive: function( button ) {
			this.ui.sortButton.removeClass( 'btn-danger' );
			button.addClass( 'btn-danger' );
		}
	});

	return SortBar;
});