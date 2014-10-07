define(['underscore', 'backbone', 'models/Card'], 
function(_, Backbone, Card){
	var Hand = Backbone.Collection.extend({

		model: Card,

		getScore: function() {
			var total = 0;
			var numAces = 0;
			for (var i = 0; i < this.models.length; i++) {
				var card = this.at(i);
				if (!card.get('isAce')) {
					total += card.get('value');
				} else {
					numAces += 1;
				}
			}

			if (numAces > 0) {
				for (var j = 0; j < numAces; j++) {
					if (total + 11 <= 21) {
						total += 11;
					} else {
						total += 1;
					}
				}
			}

			return total;
		}
	});
	return Hand;
});