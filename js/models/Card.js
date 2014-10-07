define(['underscore', 'backbone'], 
function(_, Backbone){
	var Card = Backbone.Model.extend({

		/*
		 * The Card model represents a single playing card, contains attributes which 
		 * are supplied to it by the Deck collection.
		 */

		getDisplayableName: function() {
			// return a nice-looking string which describes this card.
			return this.toTitleCase(this.get('level')) + ' of ' + this.toTitleCase(this.get('suit'));
		},

		toTitleCase: function(str) {
			// uses a simple closure to capitalize only the first letter of words.
		    return str.replace(/\w\S*/g, function(txt) {
		    	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		    });
		}		
	});
	return Card;
});