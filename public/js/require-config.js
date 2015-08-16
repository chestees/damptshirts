requirejs.config({
	baseUrl: './',
	paths: {
		marionette: 'bower_components/marionette/lib/backbone.marionette',
		backbone: 	'bower_components/backbone/backbone',
		jquery: 	'bower_components/jquery/dist/jquery',
		handlebars: 'bower_components/handlebars/handlebars',
		bootstrap: 	'bower_components/bootstrap/dist/js/bootstrap',
		underscore: 'bower_components/underscore/underscore',
		text: 		'bower_components/requirejs-text/text',
		
		velocity:   'bower_components/velocity/velocity',
		moment:     'bower_components/moment/moment',
		URI:        'bower_components/uri.js/src/URI',
		punycode:   'bower_components/uri.js/src/punycode',
		IPv6:       'bower_components/uri.js/src/IPv6',
		SecondLevelDomains: 'bower_components/uri.js/src/SecondLevelDomains',
		facebook:   '//connect.facebook.net/en_US/sdk'
	} 
	, shim: {
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
		},
		'facebook': {
			exports: 'FB'
		}
	}
});