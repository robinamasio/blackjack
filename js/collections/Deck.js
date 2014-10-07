define(['underscore', 'backbone', 'models/Card'], 
function(_, Backbone, Card){
	var Deck = Backbone.Collection.extend({

		model: Card,

		initialize: function() {
			var suits = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES'];
			var levels = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
			var values = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1];
			var aceFlags = [false, false, false, false, false, false, false, false, false, false, false, false, true];

			for (var i = 0; i < suits.length; i++) {
				for (var j = 0; j < levels.length; j++) {
					this.add(new Card({ 
										suit:suits[i], 
										level:levels[j], 
										value: values[j],
										isAce: aceFlags[j]
									}));
				}
			}	
			console.log(this)	;
		},

		shuffleCards: function() {
			// shuffle the deck!  Note that because of Backbone collections' built-in shuffle() method
			this.reset(this.shuffle(), { silent:true });			
		},

		list: function() {
			// for debugging purposes, list the contents of the deck
			_(this.models).each(function(model) {
				console.log(model.getDisplayableName());
			});

			console.log(this.models.length + ' cards!');			
		},

		deal: function(numCards, toHand) {
			var cardCount = parseInt(numCards);
			if (!isNaN(cardCount)) {
				if (cardCount > this.models.length) {
					// can't deal that many cards!
					console.log('ERROR in Deck::deal - not enough cards to deal ' + numCards);
				}
				if (cardCount > 0) {
					var dealStart = this.models.length - 1;
					var dealEnd = dealStart - cardCount;
					for (var i = dealStart; i > dealEnd; i--) {
						var theCard = this.at(i);
						this.remove(theCard);
						toHand.add(theCard);
					}
				}
			}
		}

	});
	return Deck;
});