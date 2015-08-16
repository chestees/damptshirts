define( function( require ) {

	var Marionette = require( 'marionette' );
	var Handlebars = require( 'handlebars' );

	var ShirtCollection = require( 'js/collections/shirtCollection' );
	var CountModel      = require( 'js/models/recordCount' );
	var ShirtsView      = require( 'js/views/shirtsView' );

	var tmplProductList = require( 'text!templates/productList.html' );
	
	var ShirtsCollectionView = Marionette.CompositeView.extend({
		template: Handlebars.compile( tmplProductList )
		, className: 'product-list-container'
		, childViewContainer: '.product-list'
		, childView: ShirtsView
		, ui: {
			'showMore': '.show-more'
		}
		, events: {
			'click @ui.showMore': 'showMore'
		}
		, initialize: function( options ) {
			this.app      = options.app;
			this.appModel = this.app.appModel;
			this.page     = this.appModel.get( 'page' );
			this.pageSize = this.appModel.get( 'pageSize' );
			this.orderBy  = this.appModel.get( 'dateAdded' );
			this.tagId    = parseInt( options.tagId ) || 0;

			if( this.tagId > 0 ) {
				this.collection = new ShirtCollection( {
					page: this.page
					, pageSize: this.pageSize
					, orderBy: this.orderBy
					, tagId: this.tagId
				} );
				this.collection.fetch().done( _.bind( function() {
					this.getRecordCount();
				}, this ) );
			} else {
				this.collection = this.app.collection;
				this.getRecordCount();
			}
			
			this.listenTo( this.collection, "sort", this.render );
		}
		, getRecordCount: function() {
			this.recordCount = new CountModel();
			this.recordCount.fetch().done( _.bind( function( model ) {
				this.appModel.set( {
					recordCount: model.recordCount
					, showing: this.collection.length
				} );
				if( this.appModel.get( 'showing' ) < this.appModel.get( 'recordCount' ) ) {
					this.showMore();
				}
			}, this ) );
		}
		, childViewOptions: function() {
			return {
				app: this.app
			}
		}
		, showMore: function() {
			this.appModel.set( {
				page: this.appModel.get( 'page' ) + 1
			} );
			this.collectionMore = new ShirtCollection( {
				page: this.appModel.get( 'page' )
				, pageSize: this.pageSize
				, orderBy: this.orderBy
				, tagId: this.tagId
			} );
			this.collectionMore.fetch().done( _.bind( function() {
				var yPos = window.pageYOffset;
				this.collection.add( this.collectionMore.models );
				window.scroll( 0, yPos );
				this.appModel.set( {
					showing: this.collection.length
				} );
				this.checkLength();
			}, this ) );
		}
		, checkLength: function() {
			var showing = this.appModel.get( 'showing' );
			var total   = this.appModel.get( 'recordCount' );

			if( showing >= total ) {
				this.ui.showMore.addClass( 'hidden' );
			} else {
				this.ui.showMore.removeClass( 'hidden' );
			}
		}
	});

	return ShirtsCollectionView;
});