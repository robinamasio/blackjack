define([
	'jquery',
	'underscore',
	'backbone',
	'handlebars',
	'text!templates/main.tpl'
], 
function($, _, Backbone, Handlebars, tpl) {
	var MainView = Backbone.View.extend({
		template: Handlebars.compile(tpl),
		el: $("#main"),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
		}
	});	
	return MainView;
});
