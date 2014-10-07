{{#if draw}}
<div class="game draw">PLAYER's score is {{playerScore}}, DEALER's score is {{dealerScore}}.  It's a draw.</div>
{{else}}
	{{#if playerWins}}
	<div class="game win">PLAYER's score is {{playerScore}}, DEALER's score is {{dealerScore}}.  PLAYER wins!</div>
	{{else}}
	<div class="game lose">PLAYER's score is {{playerScore}}, DEALER's score is {{dealerScore}}.  DEALER wins!</div>	
	{{/if}}
{{/if}}
<div id="controls">
	<div id="restart" class="game action">Restart</div>
</div>
