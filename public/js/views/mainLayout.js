define( function( require ) {

	var Backbone     = require( 'backbone' );
	var Marionette   = require( 'marionette' );
	var HeaderView   = require( 'js/views/headerView' );
	var AsideView    = require( 'js/views/asideView' );
	require( 'facebook' );
	
	var tmplMainLayout 		 = require( 'text!templates/mainLayout.html' );

	mainLayoutView = Marionette.LayoutView.extend({
		template: _.template( tmplMainLayout )
		, className: 'layout'
		, regions: {
			header:    'header'
			, aside:   'aside'
			, content: 'article'
		}
		, initialize: function( options ) {
			this.app = options;
			this.fbAsyncInit();
		}
		, onRender: function() {
			this.header.show( new HeaderView( this.app ) );
			this.aside.show( new AsideView() );

			console.log('Main Layout Rendered');
		}
		, fbAsyncInit: function() {
            FB.init({
                appId      : '243380072355004',
                xfbml      : true,
                version    : 'v2.0'
            });
		}
	});

	return mainLayoutView;
});