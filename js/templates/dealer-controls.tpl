<div class="game info">DEALER's score is {{ score }}.</div>

{{#if isBlackjack}}
<div class="game lose">DEALER has blackjack!  DEALER wins!</div>
<div id="controls">
	<div id="restart" class="game action">Restart</div>
</div>
{{/if}}

{{#if isBust}}
<div class="game win">DEALER is busted!  PLAYER wins!</div>
<div id="controls">
	<div id="restart" class="game action">Restart</div>
</div>
{{/if}}
