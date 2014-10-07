define(['underscore', 'backbone'], 
function(_, Backbone){
	var Card = Backbone.Model.extend({

		initialize:function() {

		},

		getDisplayableName: function() {
			return this.toTitleCase(this.get('level')) + ' of ' + this.toTitleCase(this.get('suit'));
		},

		toTitleCase: function(str) {
			// uses a simple closure to capitalize only the first letter of words
		    return str.replace(/\w\S*/g, function(txt) {
		    	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		    });
		}		
	});
	return Card;
});