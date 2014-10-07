// This module configures the basic paths of all needed third-party Javascript libraries.
require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore','jquery'],
			exports: 'Backbone'
		},
		handlebars: {
			exports: 'Handlebars'
		}		
	},
	paths: {
		text: 		"lib/text", 		
		jquery: 	'lib/jquery-1.10.2.min',
		underscore: 'lib/underscore-min',
		backbone: 	'lib/backbone-min',
		handlebars: 'lib/handlebars'
	}
});

require([
	'jquery',
	'router'
], function($, Router) {
	$(document).ready(function() {
		Router.initialize();
		console.log('app initialized');		
	});
});

