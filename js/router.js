define(['jquery', 'underscore', 'backbone', 'views/MainView'], 
function($, _, Backbone, MainView) {
	var Router = Backbone.Router.extend({ 
		routes: {
			'*actions' 	: 'defaultAction'
		},

		initialize: function() {
			this.view = null;
		},

		defaultAction: function() {
			// draw the main view!
			this.switchToView(MainView);
		},

		// This generalized function will instantiate (and render) any view class that is passed to it.
		switchToView: function(viewClass) {
			if (this.view != null) {
				this.view.remove();
			}
			this.view = new viewClass();
		}
	});

	var initialize = function() {
		var router = new Router();
		// Extend the View class to include a navigation method goTo.
		// This lets us easily navigate to a new route from inside any view's logic.
		Backbone.View.prototype.navigateTo = function (loc) {
			router.navigate(loc, true);
		};

		Backbone.history.start();
	}
	return {
		initialize: initialize
	}
});