define(['jquery', 'underscore', 'backbone', 'handlebars', 'collections/Deck', 'collections/Hand', 'text!templates/main.tpl', 'text!templates/new-card.tpl', 'text!templates/player-controls.tpl'
], 
function($, _, Backbone, Handlebars, Deck, Hand, tpl, newCardTpl, playerControlsTpl) {
	var MainView = Backbone.View.extend({

		template: Handlebars.compile(tpl),
		newCardTemplate: Handlebars.compile(newCardTpl),
		playerControlsTemplate: Handlebars.compile(playerControlsTpl),

		el: $("#main"),

		initialize: function() {
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

		render: function() {
			this.$el.html(this.template());
		},

		events: {
			'click	#deal': 	'onDealClicked',
			'click 	#hit': 		'onHitClicked',
			'click 	#stand': 	'onStandClicked', 
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

		},

		dealCardsToPlayer: function(numCards) {
			this.collection.deal(numCards, this.buffer);
			this.describeDeal('PLAYER', this.buffer);
			this.player.add(this.buffer.toJSON());
			this.buffer.reset();

			this.$el.append(this.playerControlsTemplate({
				dealtTo: 'PLAYER',
				score: this.player.getScore()
			}));

		},

		describeDeal: function(dealtTo, hand) {
			for (var i = 0; i < hand.models.length; i++) {
				var model = hand.at(i);
				this.$el.append(this.newCardTemplate({
					dealtTo: dealtTo,
					name: model.getDisplayableName()
				}));
			}
		}
	});	
	return MainView;
});
