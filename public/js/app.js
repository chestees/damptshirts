define( function( require ) {

	var Backbone 		= require( 'backbone' );
	var Marionette 		= require( 'marionette' );
	var MainLayout 		= require( 'js/views/mainLayout' );
	
	var ShirtCollection      = require( 'js/collections/shirtCollection' );
	var ShirtsModel     = require( 'js/models/shirtsModel' );
	var ShirtsCollectionView = require( 'js/views/shirtsCollectionView' );

	var myApp = new Marionette.Application();
	
	myApp.addRegions({
		body: 'body'
	});

	myApp.addInitializer(function() {
		myApp.router = new MyRouter();
		var mainLayout = new MainLayout();

		this.shirtCollection = new ShirtCollection();
		this.shirtCollection.fetch();
		this.shirtModel = new ShirtsModel();

		this.body.show( mainLayout );
	});

	myApp.on('start', function() {
		Backbone.history.start();
		console.log('App Started');
	});

	var MyRouter = Backbone.Marionette.AppRouter.extend({
		/* standard routes can be mixed with appRoutes/Controllers above */
		routes : {
			'': 'home',
			':slug/shirt/:id': 'details'
		},
		home : function() {
			myApp.body.currentView.content.show( new ShirtsCollectionView( { 
				collection: myApp.shirtCollection
			} ) );
		},
		details : function( slug, id ) {			
			// //shirtDetailModel = myApp.shirtCollection.get({'_id': '54120e0518ccf04d664f6172'});
			// shirtsDetailView = new ShirtDetailView({
			// 	model: myApp.shirtModel
			// });
		}
	});

	return myApp;
});