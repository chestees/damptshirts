define( function( require ) {

	var Marionette 		= require( 'marionette' );
	var Bootstrap       = require( 'bootstrap' );
	var MainLayout 		= require( 'js/views/mainLayout' );
	var ShirtsLayout 	= require( 'js/views/shirtsLayout' );
	var HeaderView      = require( 'js/views/headerView' );
	
	var ShirtCollection      = require( 'js/collections/shirtCollection' );
	var ShirtsModel          = require( 'js/models/shirtsModel' );
	var ShirtsCollectionView = require( 'js/views/shirtsCollectionView' );
	var ShirtDetailView      = require( 'js/views/shirtsDetailView' );
	var TagListView          = require( 'js/views/tagsView' );

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
		routes : {
			'': 'home',
			':slug/shirt/:id': 'details',
			'tag-list': 'tagList'
		},
		home : function() {
			if ( !myApp.body.currentView.content.currentView ) {
				myApp.body.currentView.content.show( new ShirtsLayout() );
			}
		},
		details : function( slug, id ) {
			if ( !myApp.body.currentView.content.currentView ) {
				myApp.body.currentView.content.show( new ShirtsLayout() );
			}
			
			shirtModel = new ShirtsModel( {id : id} );
			shirtModel.fetch({
				success: function() {
					myApp.body.currentView.detailModal.show( new ShirtDetailView({
						model: this.shirtModel
					}));
					$('.modal').modal({
						'show': true
					});
				},
				error: function(res) {
					console.log("ERROR: " + JSON.stringify(res));
				}
			});
		},
		tagList : function() {
			myApp.body.currentView.content.show( new TagListView() );
		}
	});

	// extend the app with additional functionality
	_.extend(
		HeaderView
	);

	return myApp;
});