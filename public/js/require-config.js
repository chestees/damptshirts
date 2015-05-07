requirejs.config({
	baseUrl: './',
	paths: {
		backbone: 	'bower_components/backbone/backbone',
		underscore: 'bower_components/underscore/underscore',
		text: 		'bower_components/requirejs-text/text',
		jquery: 	'bower_components/jquery/dist/jquery',
		handlebars: 'bower_components/handlebars/handlebars',
		marionette: 'bower_components/marionette/lib/backbone.marionette',
		bootstrap: 	'bower_components/bootstrap/dist/js/bootstrap',
		fuelux: 	'bower_components/fuelux/dist/all',
		velocity:   'bower_components/velocity/velocity',
		moment:     'bower_components/moment/moment',
	}, 
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [ 'underscore', 'jquery' ],
			exports: 'Backbone'
		},
		'marionette' : {
	      deps : ['backbone'],
	      exports : 'Marionette'
	    },
		'bootstrap': {
			deps: [ 'jquery' ],
			exports: 'Bootstrap'
		}
	}
});