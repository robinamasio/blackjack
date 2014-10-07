define([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function($,_,Backbone, Router) {	
	
		return {
			initialize: function() {
				//initialize our event broadcasting subsystem
				Backbone.evt = _.extend({}, Backbone.Events);
				Router.initialize();
			}			
		}	
});