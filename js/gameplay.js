/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he/she wishes. Each result gets added to his/her round score. 
- But, if the player rolls a 1, all his round score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his/her round score gets added to his global score. After that, it's the next player's turn.
- The first player to reach 100 points on global score wins the game.
*/

  
var scores, roundScore, activePlayer, dice, gamePlaying;

init();

//Action when roll button clicked
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //Roll a random number from 1 - 6
        dice = Math.floor(Math.random() * 6) + 1;
    
        //Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        //Update round score if number not 1
        if (dice !== 1) {
            //Add score to current score
            roundScore += dice;
            document.querySelector('#current-score-' + activePlayer).textContent = roundScore;
        } else {
            //Change player
            nextPlayer();
        }
    }
});
    
//Action when hold button clicked
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";

            //Hide dice
            document.querySelector('.dice').style.display = 'none';

            //Add css styles for the winner
            document.querySelector('.player-' + activePlayer).classList.add('winner');
            document.querySelector('.player-' + activePlayer).classList.remove('active');

            //Set gamePlaying to false, disabling game play buttons
            gamePlaying = false;
            
        } else {
            //Change player
            nextPlayer();
        }
    }
});
    
//Action when click on new game button    
document.querySelector('.btn-new').addEventListener('click', init);

//Display game rules to player when clicked
document.querySelector('#btn-rules').addEventListener('click', function(){
   alert("GAME RULES: \n - The game has 2 players, playing in rounds." +
"\n - In each turn, a player rolls the dice as many times as he/she wishes. Each result gets added to their round score. " +
"\n - But, if the player rolls a 1, the round score gets lost. After that, it's the next player's turn." +
"\n - The player can choose to 'Hold', which means that their round score will be added to their global score. After that, it's the next player's turn." +
"\n - The first player to reach 100 points on global score wins the game."); 
});
    
//Function to change players    
function nextPlayer() {
    //Change player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    //Reset current score
    document.getElementById('current-score-0').textContent = '0';
    document.getElementById('current-score-1').textContent = '0';
        
    //Change active player
    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');
    
    //Hide dice
    document.querySelector('.dice').style.display = 'none';
}
    
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //Hide Dice
    document.querySelector('.dice').style.display = 'none';

    //Set all scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-score-0').textContent = '0';
    document.getElementById('current-score-1').textContent = '0';
    
    //Set player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //Remove winner css styles
    document.querySelector('.player-0').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('winner');
    
    //Set active player to player 1
    document.querySelector('.player-0').classList.remove('active');
    document.querySelector('.player-1').classList.remove('active');
    document.querySelector('.player-0').classList.add('active');
}