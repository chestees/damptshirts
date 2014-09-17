define( function( require ) {
	
	var Marionette      = require( 'marionette' );

	//TEMPLATE
	var tmplDetail = require( 'text!/templates/detail.html' );

	var ShirtsDetailView = Marionette.ItemView.extend({
		template: _.template( tmplDetail )
		, className: '.Detail'
		, initialize: function( options ) {
			console.log("DETAILS");
		}
	});

	return ShirtsDetailView;
});