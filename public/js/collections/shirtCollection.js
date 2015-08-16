define( function( require ) {

	var Backbone    = require( 'backbone' );
	var URI = require( 'URI' );

	var ShirtsModel = require( 'js/models/shirtsModel' );

	var ShirtCollection = Backbone.Collection.extend({
		model: ShirtsModel
		// , url: 'http://damptshirts.herokuapp.com/api/products'
		, url: function() {
			return URI( 'api/products' ).query( this.params );
		}
		, initialize: function( options ) {
			var page      = options.page;
			var pageSize  = options.pageSize;
			this.orderBy  = options.orderBy;
			var tagId     = options.tagId;

			this.listenTo( this, "sort", this.render );
			this.params = {
				Page: page
				, PageSize: pageSize
				, OrderBy: this.orderBy
				, TagId: tagId
			};
		}
		, comparator: function( model ) {
			return -model.get( this.orderBy );
		}
	});

	return ShirtCollection;
});