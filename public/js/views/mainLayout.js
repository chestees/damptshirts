define( function( require ) {

	var Backbone     = require( 'backbone' );
	var Marionette   = require( 'marionette' );
	var HeaderView   = require( 'js/views/headerView' );
	var AsideView    = require( 'js/views/asideView' );
	var ShirtsLayout = require( 'js/views/shirtsLayout' );
	
	var tmplMainLayout 		 = require( 'text!/templates/mainLayout.html' );

	mainLayoutView = Marionette.Layout.extend({
		template: _.template( tmplMainLayout )
		, className: 'layout'
		, regions: {
			header:    'header'
			, aside:   'aside'
			, content: 'article'
		}
		, initialize: function( options ) {
			this.app = options;
		}
		, onRender: function() {
			this.header.show( new HeaderView( this.app ) );
			this.aside.show( new AsideView() );

			console.log('Main Layout Rendered');
		}
	});

	return mainLayoutView;
});