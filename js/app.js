// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set enemy's location
    this.x = x;
    this.y = y;

    // Set enemy's moving speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //*
    if (this.x < 505) {
        this.x = this.x + (101 * dt) * this.speed;
    } else {
        this.x = 0;
    }
    /**/

    // console.log(this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Set up image for player
    this.sprite = 'images/char-boy.png';

    // Set player's position
    this.x = x;
    this.y = y
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {

};


// Now instantiate your objects.
var enemy1 = new Enemy(0, 62, 1);
var enemy2 = new Enemy(0, 145, 1.5);
var enemy3 = new Enemy(0, 228, 2);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];


// Place the player object in a variable called player
// (202, 394) is the initial position of the player
var player = new Player(202, 394);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
