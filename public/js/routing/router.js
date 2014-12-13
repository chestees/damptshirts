define( function( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );

	var ShirtsLayout    = require( 'js/views/shirtsLayout' );
	var TagListView     = require( 'js/views/tagsView' );

	var Router = Marionette.AppRouter.extend({
		initialize: function( options ) {
			this.app = options;
		}
		, routes : {
			'': 'home',
			':slug/shirt/:id': 'details',
			'tag-list': 'tagList',
		}
		, home : function() {
			if ( !this.app.mainLayout.content.currentView ) {
				this.app.body.currentView.content.show( new ShirtsLayout( { app: this.app } ) );
			}
		}
		, details : function( slug, id ) {
			if ( !this.app.mainLayout.content.currentView ) {
				var shirtsLayout = new ShirtsLayout( { app: this.app, id: id } );
				this.app.mainLayout.content.show( shirtsLayout );
			}
		}
		, tagList : function() {
			this.app.body.currentView.content.show( new TagListView() );
		}
	});
	return Router;
});