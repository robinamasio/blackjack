define(['jquery', 'underscore', 'backbone', 'handlebars', 'collections/Deck', 'collections/Hand', 'text!templates/main.tpl', 'text!templates/new-card.tpl', 'text!templates/player-controls.tpl', 'text!templates/stand.tpl', 'text!templates/dealer-controls.tpl', 'text!templates/outcome.tpl',
], 
function($, _, Backbone, Handlebars, Deck, Hand, tpl, newCardTpl, playerControlsTpl, standTpl, dealerControlsTpl, outcomeTpl) {
	/*
	 * MainView contains the logic of the Blackjack game.  Backbone routes the application to MainView 
	 * as the default action, but with the addition of a new route and a new view, we could easily leverage
	 * our existing Deck, Card and Hand data structures to build a different card game.
	 */
	var MainView = Backbone.View.extend({
		template: Handlebars.compile(tpl),
		newCardTemplate: Handlebars.compile(newCardTpl),
		playerControlsTemplate: Handlebars.compile(playerControlsTpl),
		standTemplate: Handlebars.compile(standTpl),
		dealerControlsTemplate: Handlebars.compile(dealerControlsTpl),
		outcomeTemplate: Handlebars.compile(outcomeTpl),

		el: $("#main"),

		initialize: function() {
			this.startNewGame();		
		},

		render: function() {
			// template() is a function which was built by Handlebars from the content of tpl, which 
			// is the text of templates/main.tpl.  The function will simply spit out the text.  Here
			// we fill our #main element with an introductory message.
			this.$el.html(this.template());
		},

		events: {
			'click	#deal': 	'onDealClicked',
			'click 	#hit': 		'onHitClicked',
			'click 	#stand': 	'onStandClicked', 
			'click 	#restart': 	'onRestartClicked'
		},

		startNewGame: function() {
			// create a new deck and shuffle it
			this.collection = new Deck();
			this.collection.shuffleCards();
			this.collection.list();

			this.dealer = new Hand();
			this.player = new Hand();
			this.buffer = new Hand();   // a holding area where new cards get dealt, before they are
										// put into the dealer or player's hand.

			this.render();		
		},

		onRestartClicked: function() {
			// when the user clicks "Restart", reinitialize everything and start a new game.
			this.startNewGame();
		},

		onDealClicked: function() {
			// when the user clicks "Deal", remove the "Deal" button and deal 2 cards to the player.
			$('#controls').remove();
			this.dealCardsToPlayer(2);
		},

		onHitClicked: function() {
			// when the user clicks "Hit", remove the "Deal" button and deal 1 card to the player.
			$('#controls').remove();
			this.dealCardsToPlayer(1);			
		},

		onStandClicked: function() {
			// when the user clicks "Stand", recalculate the user's score, display it, and deal 2
			// cards to the dealer.
			$('#controls').remove();
			var score = this.player.getScore();

			this.$el.append(this.standTemplate({
				name: 'PLAYER',
				score: score
			}));		

			this.dealCardsToDealer(2);	
		},

		dealCardsToPlayer: function(numCards) {
			// deal cards to the player and display them using the player-controls.tpl template.
			// also calculate whether this deal wins or loses the game.
			this.collection.deal(numCards, this.buffer);
			this.describeDeal('PLAYER', this.buffer);
			this.player.add(this.buffer.toJSON());
			this.buffer.reset();

			var score = this.player.getScore();

			this.$el.append(this.playerControlsTemplate({
				score: score,
				isBust: (score > 21),
				isBlackjack: (score == 21),
				isOK: (score < 21)
			}));
		},

		dealCardsToDealer: function(numCards) {
			// deal cards to the dealer and display them using the dealer-controls.tpl template.
			// also calculate whether this deal wins or loses the game.
			this.collection.deal(numCards, this.buffer);
			this.describeDeal('DEALER', this.buffer, true);
			this.dealer.add(this.buffer.toJSON());
			this.buffer.reset();

			var score = this.dealer.getScore();
			var isBust = (score > 21);
			var isBlackjack = (score == 21);
			var isOK = (score < 21);

			this.$el.append(this.dealerControlsTemplate({
				score: score,
				isBust: isBust,
				isBlackjack: isBlackjack
			}));

			// if this deal neither won nor lost the game, then the dealer must either hit or stand.
			if (isOK) {
				if (score < 17) {
					// a hit simply recurses back to this function, dealing 1 additional card.
					this.dealCardsToDealer(1);
				} else {
					// a stand forces comparison of the player's and dealer's score for a final outcome.
					this.standDealer(score);
				}
			}
		},

		describeDeal: function(dealtTo, hand, toDealer) {
			// print a descriptive sentence about the card(s) that were just dealt into the buffer area.
			for (var i = 0; i < hand.models.length; i++) {
				var model = hand.at(i);
				this.$el.append(this.newCardTemplate({
					dealtTo: dealtTo,
					name: model.getDisplayableName(),
					toDealer: toDealer
				}));
			}
		},

		standDealer: function(dealerScore) {
			// calculate the final outcome of the game.
			this.$el.append(this.standTemplate({
				name: 'DEALER',
				score: dealerScore
			}));	

			var playerScore = this.player.getScore();
			this.$el.append(this.outcomeTemplate({
				dealerScore: dealerScore,
				playerScore: playerScore,
				playerWins: (playerScore > dealerScore),
				draw: (playerScore == dealerScore)
			}))
		}

	});	
	return MainView;
});
