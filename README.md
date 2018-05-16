# Frogger
This Udacity front-end project is an implementation of classic arcade game Frogger.  It's built in JavaScript, utilizes object-oriented programming in JavaScript. 

Contructor functions and prototype functions are the majority part of the code, and keyword `this` is used appropriately to refer the object upon which functions are called.

## Version
* Version 1.1 - released on May 15th, 2018 with added features:
  * A player is given five lives at the beginning of the game.
  * A player colliding with an enemy will lose a life. Lose all five lives, the game is over.
  * A player can pick up gems. One picked up gem will increase score by 50.
  * When the game is over, a popup will show up with a player's final score. Close modal, restart the game.
* ~~Version 1.0 - released on May 6th, 2018~~

## Run The Game
1. Download this repo, then open `index.html` in your browser. Or,
2. Play it at github.io [Frogger](https://eqlz.github.io/frogger/).

## How To Play The Game
Player can move up, down, left, right via these keys on the keyboard.  To win the game, player need to avoid enemies, and successfully reach the river.

Player will restart at the initial position when it collides with enemeies or reach the river.
