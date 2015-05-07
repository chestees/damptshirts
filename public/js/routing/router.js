define( function( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );

	var ShirtsCollectionView  = require( 'js/views/shirtsCollectionView' );
	var ShirtModel = require( 'js/models/shirtsModel' );
	var TagListView = require( 'js/views/tagsView' );
	var DetailView  = require( 'js/views/shirtsDetailView' );
	var ScraperView = require( 'js/views/scraper' );

	var Router = Marionette.AppRouter.extend({
		initialize: function( options ) {
			this.app = options;
		}
		, routes : {
			'': 'home',
			':slug/shirt': 'details',
			'tag-list': 'tagList',
			'scraper': 'scraper'
		}
		, home : function() {
			this.app.mainLayout.content.show( new ShirtsCollectionView( this.app ) );
		}
		, details : function( slug ) {
			var shirtModel = this.app.shirtModel;
			
			// Check if the model is set
			if( !shirtModel.has( 'id' ) ) {
				
				console.log( "NO MODEL" );
				
				shirtModel = new ShirtModel( { 'slug': slug } );
				shirtModel.fetch().done( _.bind( function( data ) {
					this.app.shirtModel = new ShirtModel( data[0] );
					this.app.mainLayout.content.show( new DetailView( { model: this.app.shirtModel } ) );
				}, this ) );
			} else {
				this.app.mainLayout.content.show( new DetailView( { model: shirtModel } ) );
			}
		}
		, tagList : function() {
			this.app.body.currentView.content.show( new TagListView() );
		}
		, scraper : function() {
			this.app.mainLayout.content.show( new ScraperView( this.app ) );
		}
	});
	return Router;
});