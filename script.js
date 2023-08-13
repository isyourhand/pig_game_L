'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

console.log(currentScore0El);

// Starting conditions

let scores, currentScore, currentPlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  // switch to next player
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll.
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score

      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore += dice;
    } else {
      document.querySelector(`#score--${currentPlayer}`).textContent = scores[
        currentPlayer
      ] += currentScore;

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score.

    document.querySelector(`#score--${currentPlayer}`).textContent = scores[
      currentPlayer
    ] += currentScore;

    // 2. Check if player's score is >= 100
    if (scores[currentPlayer] >= 25) {
      // Finsh the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }

    // Finsh the game
  }
});

btnNew.addEventListener('click', init);
