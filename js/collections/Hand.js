define(['underscore', 'backbone', 'models/Card'], 
function(_, Backbone, Card){
	var Hand = Backbone.Collection.extend({

		/* 
		 * This collection represents a hand, whether it's the PLAYER's or the DEALER's.
		 */

		model: Card,

		getScore: function() {
			// calculate the score of this hand, taking aces into account.
			var total = 0;
			var numAces = 0;
			for (var i = 0; i < this.models.length; i++) {
				var card = this.at(i);
				if (!card.get('isAce')) {
					// if this card is NOT an ace, simply add its numeric value to the total
					total += card.get('value');
				} else {
					// if this card IS an ace, simply keep track of how many aces we have.
					numAces += 1;
				}
			}

			if (numAces > 0) {
				// for each ace, assign it a value of 11 if doing so will not bust the player.  
				// otherwise, assign it a value of 1.
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