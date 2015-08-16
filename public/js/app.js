define( function( require ) {

	var Marionette 		= require( 'marionette' );
	var Bootstrap       = require( 'bootstrap' );

	var Router          = require( 'js/routing/router' );
	var MainLayout 		= require( 'js/views/mainLayout' );
	var HeaderView      = require( 'js/views/headerView' );
	
	var ShirtCollection  = require( 'js/collections/shirtCollection' );
	var VendorCollection = require( 'js/collections/vendorCollection' );
	var TagsCollection   = require( 'js/collections/tagsCollection' );

	var app = new Marionette.Application();
	
	app.addRegions({
		body: 'body'
		, head: 'head'
	});
	
	var AppModel = Backbone.Model.extend();
	app.appModel = new AppModel( {
		page: 1
		, pageSize: 1 * 6
		, orderBy: 'dateAdded'
		, pageTitle: 'Damp tShirts'
	} );

	// Used to populate the detail model
	var ShirtModel = Backbone.Model.extend();
	app.shirtModel = new ShirtModel();

	app.vendorCollection = new VendorCollection();
	app.tagsCollection = new TagsCollection();
	app.collection = new ShirtCollection( {
		page: app.appModel.get( 'page' )
		, pageSize: app.appModel.get( 'pageSize' )
		, orderBy: app.appModel.get( 'dateAdded' )
	} );

	var fetchPromises = [];
	var tags          = app.tagsCollection.fetch();
	var vendors       = app.vendorCollection.fetch();
	var collection    = app.collection.fetch();

	fetchPromises.push( vendors, tags, collection );

	app.addInitializer( function() {
		
		app.ogUrl         = app.head.$el.find( '#ogUrl' );
		app.ogTitle       = app.head.$el.find( '#ogTitle' );
		app.ogDescription = app.head.$el.find( '#ogDescription' );
		app.ogType        = app.head.$el.find( '#ogType' );
		app.ogImage       = app.head.$el.find( '#ogImage' );

		$.when.apply( $, fetchPromises ).done( function() {
			app.mainLayout = new MainLayout( app );
			app.body.show( app.mainLayout );
			app.router = new Router( app );
			Backbone.history.start();
		} )
	} );

	app.on('start', function() {
		console.log('App Started');
	});

	return app;
});