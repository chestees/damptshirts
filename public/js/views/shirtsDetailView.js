define( function( require ) {
	
	var Marionette      = require( 'marionette' );
	var ShirtCollection = require( 'js/collections/shirtCollection' );
	var ShirtsModel     = require( 'js/models/shirtsModel' );

	//TEMPLATE
	var tmplDetail = require( 'text!/templates/detail.html' );

	var ShirtsDetailView = Backbone.View.extend({
		template: _.template( tmplDetail )
		, className: '.Detail'
		, initialize: function( options ) {
			console.log("DETAILS");
		}
		, render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return ShirtsDetailView;
});