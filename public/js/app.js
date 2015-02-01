define( function( require ) {

	var Marionette 		= require( 'marionette' );
	var Bootstrap       = require( 'bootstrap' );

	var Router          = require( 'js/routing/router' );
	var MainLayout 		= require( 'js/views/mainLayout' );
	var HeaderView      = require( 'js/views/headerView' );
	
	var ShirtCollection      = require( 'js/collections/shirtCollection' );
	var ShirtsModel          = require( 'js/models/shirtsModel' );
	var ShirtsCollectionView = require( 'js/views/shirtsCollectionView' );
	var ShirtDetailView      = require( 'js/views/shirtsDetailView' );

	var app = new Marionette.Application();
	
	app.addRegions({
		body: 'body'
	});

	app.addInitializer(function() {
		
		app.collection = new ShirtCollection();
		app.collection.fetch().done( function() {
			app.mainLayout = new MainLayout( app );
			app.body.show( app.mainLayout );
			app.router = new Router( app );

			Backbone.history.start();
		});
	});

	app.on('start', function() {
		console.log('App Started');
	});

	return app;
});