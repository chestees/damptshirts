define( function( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );

	var ShirtsCollectionView  = require( 'js/views/shirtsCollectionView' );
	var ShirtModel = require( 'js/models/shirtsModel' );
	var TagsCollectionView = require( 'js/views/tagsCollectionView' );
	var DetailView  = require( 'js/views/shirtsDetailView' );
	var ScraperView = require( 'js/views/scraper' );

	var Router = Marionette.AppRouter.extend({
		initialize: function( options ) {
			this.app = options;
		}
		, routes : {
			'': 'home',
			':slug/:dampId': 'shirt',
			':slug/tag/:tagId': 'tag', 
			'tags': 'tagList',
			'scraper': 'scraper'
		}
		, home : function() {
			this.app.router.navigate( '/' );
			this.app.mainLayout.content.show( new ShirtsCollectionView( {
				app: this.app 
			} ) );
		}
		, shirt : function( slug, dampId ) {
			var shirtModel = this.app.shirtModel;
			
			// Check if the model is set
			if( !shirtModel.has( 'id' ) ) {				
				shirtModel = new ShirtModel( { 'dampId': dampId } );
				shirtModel.fetch().done( _.bind( function( data ) {
					this.app.shirtModel = new ShirtModel( data );
					this.app.mainLayout.content.show( new DetailView( {
						app: this.app
						, model: this.app.shirtModel
					} ) );
					this.app.ogUrl.attr( 'content', 'http://damptshirts.herokuapp.com/#/' + this.app.shirtModel.get( 'slug' ) + '/shirt/' + this.app.shirtModel.id );
					this.app.ogTitle.attr( 'content', this.app.shirtModel.get( 'title' ) );
					this.app.ogDescription.attr( 'content', this.app.shirtModel.get( 'description' ) );
					this.app.ogType.attr( 'content', 'product' );
					this.app.ogImage.attr( 'content', this.app.shirtModel.get( 'image' ) );
				}, this ) );
			} else {
				this.app.mainLayout.content.show( new DetailView( {
					app: this.app
					, model: shirtModel
				} ) );
			}
		}
		, tag: function( slug, tagId ) {
			this.app.mainLayout.content.show( new ShirtsCollectionView( {
				app: this.app
				, tagId: tagId
			} ) );
		}
		, tagList: function() {
			$.when( this.app.tagsCollection.fetch() ).done( _.bind( function() {
				this.app.body.currentView.content.show( new TagsCollectionView( {
					app: this.app
				} ) );
			}, this ) );
		}
		, scraper: function() {
			this.app.mainLayout.content.show( new ScraperView( this.app ) );
		}
	});
	return Router;
});