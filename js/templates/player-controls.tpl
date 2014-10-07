<div class="game info">PLAYER's score is {{ score }}.</div>

{{#if isBlackjack}}
<div class="game win">You have blackjack!  PLAYER wins!</div>
<div id="controls">
	<div id="restart" class="game action">Restart</div>
</div>
{{/if}}

{{#if isBust}}
<div class="game lose">You're busted!  DEALER wins!</div>
<div id="controls">
	<div id="restart" class="game action">Restart</div>
</div>
{{/if}}

{{#if isOK}}
<div id="controls">
	<div id="hit" class="game action">Hit</div>
	<div id="stand" class="game action">Stand</div>
</div>
{{/if}}