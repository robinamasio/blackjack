define(['jquery', 'underscore', 'backbone', 'handlebars', 'collections/Deck', 'collections/Hand', 'text!templates/main.tpl', 'text!templates/new-card.tpl', 'text!templates/player-controls.tpl', 'text!templates/stand.tpl', 'text!templates/dealer-controls.tpl', 'text!templates/outcome.tpl',
], 
function($, _, Backbone, Handlebars, Deck, Hand, tpl, newCardTpl, playerControlsTpl, standTpl, dealerControlsTpl, outcomeTpl) {
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
			this.buffer = new Hand();   // the area that new cards get dealt into before they get put 
										// into the dealer or player's hand.

			this.render();		
		},

		onRestartClicked: function() {
			this.startNewGame();
		},

		onDealClicked: function() {
			$('#controls').remove();
			this.dealCardsToPlayer(2);
		},

		onHitClicked: function() {
			$('#controls').remove();
			this.dealCardsToPlayer(1);			
		},

		onStandClicked: function() {
			$('#controls').remove();
			var score = this.player.getScore();

			this.$el.append(this.standTemplate({
				name: 'PLAYER',
				score: score
			}));		

			this.dealCardsToDealer(2);	
		},

		dealCardsToPlayer: function(numCards) {
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

			if (isOK) {
				if (score < 17) {
					this.dealCardsToDealer(1);
				} else {
					this.standDealer(score);
				}
			}
		},

		describeDeal: function(dealtTo, hand, toDealer) {
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
