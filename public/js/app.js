define( function( require ) {

	var Backbone 		= require( 'backbone' );
	var Marionette 		= require( 'marionette' );
	var MainLayout 		= require( 'js/views/mainLayout' );
	
	var ShirtCollection      = require( 'js/collections/shirtCollection' );
	var ShirtsModel     = require( 'js/models/shirtsModel' );
	var ShirtsCollectionView = require( 'js/views/shirtsCollectionView' );
	var ShirtDetailView = require( 'js/views/shirtsDetailView' );

	var myApp = new Marionette.Application();
	
	myApp.addRegions({
		body: 'body'
	});

	myApp.addInitializer(function() {
		myApp.router = new MyRouter();
		myApp.mainLayout = new MainLayout();
		myApp.body.show( myApp.mainLayout );

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
			shirtCollection = new ShirtCollection();
			shirtCollection.fetch({
				success: function() {
					myApp.body.currentView.content.show( new ShirtsCollectionView( { 
						collection: this.shirtCollection
					} ) );
				}
			});
		},
		details : function( slug, id ) {
			shirtModel = new ShirtsModel( {id : id} );
			shirtModel.fetch({
				success: function() {
					myApp.body.currentView.content.show( new ShirtDetailView({
						model: this.shirtModel
					}) )
					console.log("Fuck");
				},
				error: function(res) {
					console.log("SHIT: " + JSON.stringify(res));
				}
			});
			//console.log("URL: " + shirtModel.urlRoot)
	        //myModel = myApp.model;
		}
	});

	return myApp;
});