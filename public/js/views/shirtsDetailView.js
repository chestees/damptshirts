define( function( require ) {
	
	var Marionette = require( 'marionette' );
	var Handlebars = require( 'handlebars' );
	require( 'facebook' );

	var tmplDetail = require( 'text!templates/detail.html' );

	var ShirtsDetailView = Marionette.LayoutView.extend({
		template: Handlebars.compile( tmplDetail )
		, templateHelpers: function() {
			this.vendorName = this.vendor.get( 'vendor' );
			this.discount   = this.vendor.get( 'couponText' );
			this.showDiscountText = false;
			if( this.discount ) {
				this.showDiscountText = true;
			}
			return {
				image: this.imageSize()
				, vendorLink: this.vendorLink()
				, vendorName: this.vendorName
				, affiliateLink: this.affiliateLink()
				, discountText: this.discount
				, showDiscountText: this.showDiscountText
			}
		}
		, className: 'detail container-fluid'
		, ui: {
			btnAffiliate: '.btn-affiliate'
			, back: '.back'
			, btnFacebook: '.facebook'
		}
		, events: {
			'click @ui.back': 'back'

			, 'click @ui.btnFacebook': 'socialFacebook'

		}
		, regions: {
			tags: '.tags'
			, social: '.social'
		}
		, initialize: function( options ) {
			this.app   = options.app;
			this.model = options.model;
			vendorId   = this.model.get( 'vendorId' );

			document.title = this.model.get( 'title');

			this.vendors = options.app.vendorCollection;
			this.vendor = _.find( this.vendors.models, _.bind( function( vendor ) {
				if( vendor.get( 'vendorId' ) === vendorId ) {
					return vendor;
				}
			}, this ) );
		}
		, onRender: function() {
			this.app.ogUrl.attr( 'content', 'http://damptshirts.herokuapp.com/#/' + this.model.get( 'slug' ) + '/shirt/' + this.model.id );
			this.app.ogTitle.attr( 'content', this.model.get( 'title' ) );
			this.app.ogDescription.attr( 'content', this.model.get( 'description' ) );
			this.app.ogType.attr( 'content', 'product' );
			this.app.ogImage.attr( 'content', this.model.get( 'image' ) );
		}
		, vendorLink: function() {
			var vendorUrl  = this.vendor.get( 'url' );
			return this.buildLink( vendorUrl );
		}
		, affiliateLink: function() {
			var affiliateLink = this.model.get( 'link' );
			return this.buildLink( affiliateLink );
		}
		, buildLink: function( url ) {
			var linkPrefix = this.vendor.get( 'linkPrefix' );
			var linkSuffix = this.vendor.get( 'linkSuffix' );
			
			if( !linkPrefix ) {
				link = url + linkSuffix;
			} else {
				if( linkPrefix.indexOf( 'shareasale' ) > 0 ) {
					linkPrefix = linkPrefix.replace( 'afftrack=', 'afftrack=' + this.model.get( 'dampId' ) );
					link = linkPrefix + url.replace( 'http://', '' );
				} else {
					link = linkPrefix + vendorUrl;
				}
			}
			return link;
		}
		, imageSize: function() {
			var imageLg;
			var imageSm;
			if( this.model.get( 'imageLg' ) ) {
				imageLg = this.model.get( 'imageLg' );
			}
			
			imageSm = this.model.get( 'image' );

			!imageLg ? image = imageSm : image = imageLg;

			return image;
		}
		, socialFacebook: function() {
			FB.ui({
				method: 'share',
				action_type: 'og.likes',
				action_properties: JSON.stringify({
					object: 'http://damptshirts.herokuapp.com/#/' + this.model.get( 'slug' ) + '/shirt/' + this.model.id
					, message: this.model.get( 'name' )
					, image: this.model.get( 'image' )
				})
			}, function(response){
				console.log("DONE::::::::")
			});
		}
		, back: function() {
			this.app.router.home();
		}
	});

	return ShirtsDetailView;
});