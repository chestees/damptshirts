define( function( require ) {
	
	var Marionette = require( 'marionette' );

	var tmplScraper = require( 'text!templates/scraper.html' );

	var ScraperView = Marionette.ItemView.extend({
		template: _.template( tmplScraper )
		, className: 'scraper'
		, initialize: function() {
		
		}
		, onRender: function() {
			
		}
	});

	return ScraperView;
});