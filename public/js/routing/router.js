define( function( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );

	var ShirtsCollectionView  = require( 'js/views/shirtsCollectionView' );
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
			var model = _.find( app.collection.models, function( model ) { 
				return model.get( 'slug' ) === slug;
			} );
			this.app.mainLayout.content.show( new DetailView( { model: model } ) );
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