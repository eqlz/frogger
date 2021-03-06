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
    
    if (this.x <= 505) {
        this.x = this.x + (101 * dt) * this.speed;
    } else {
        this.x = 0;
    }

    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function() {
    // Check whether player has collision with one of the enemies
    if (((this.x + 101 >= player.x + 20 && // When enemy's head has touched the left edge of player
                                           // 20 is the distance between character edge and character block edge
        this.x + 101 <= player.x + 101 - 20) || // When enemy's head has not reached the right edge of the player
        (this.x >= player.x + 20 && // When enemy's tail has touched the left edge of player
        this.x <= player.x + 101 - 20)) && // When enemy's tail has not reached the right edge of player
        this.y + 21 == player.y) {
        
        // When collide, reset player to initial position
        player.resetPlayer();

        // When collide, reduce one life, i.e. remove one heart at the bottom row
        allLives.pop();

        resetGems();

        showGameOverModal();
    }
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
    this.y = y;

    // Set horizontal and vertical movement change for each move
    this.dx = 0;
    this.dy = 0;
};

Player.prototype.update = function() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    
    this.dx = 0;
    this.dy = 0;

    allGems.forEach(function(gem) {
        gem.update();
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
    // When player's position is in the middle, i.e. not on the edge
    if (this.x > 0 && this.x < 404 && this.y > 0 && this.y < 415) {
        console.log("move in the middle");      
        switch (pressedKey) {
            case 'right':
                this.dx = 101;
                this.dy = 0;
                break;
            case 'left':
                this.dx = -101;
                this.dy = 0;
                break;
            case 'up':
                this.dx = 0;
                this.dy = -83;
                break;
            case 'down':
                this.dx = 0;
                this.dy = 83;
                break;
        } 
    }

    // When player's position is on the edge: bottom, left, right
    if (this.x == 0 || this.x == 404 || this.y == 415) {
        if (this.y == 415) { // When player is on the bottom grass blocks 
            if (this.x > 0 && this.x < 404) { // When player's position is among the middle three grass blocks
                switch (pressedKey) {
                    case 'right':
                        this.dx = 101;
                        this.dy = 0;
                        break;
                    case 'left':
                        this.dx = -101;
                        this.dy = 0;
                        console.log("move to the left");
                        break;
                    case 'up':
                        this.dx = 0;
                        this.dy = -83;
                        break;
                    case 'down':
                        this.dx = 0;
                        this.dy = 0;
                        break;
                }        
            } else { 
                if (this.x == 0) { // When player's position is at bottom left corner
                    switch (pressedKey) {
                        case 'right':
                            this.dx = 101;
                            this.dy = 0;
                            break;
                        case 'left':
                            this.dx = 0;
                            this.dy = 0;
                            break;
                        case 'up':
                            this.dx = 0;
                            this.dy = -83;
                            break;
                        case 'down':
                            this.dx = 0;
                            this.dy = 0;
                            break;
                    }
                } else { // When player's position is at bottom right corner
                    switch (pressedKey) {
                        case 'right':
                            this.dx = 0;
                            this.dy = 0;
                            break;
                        case 'left':
                            this.dx = -101;
                            this.dy = 0;
                            break;
                        case 'up':
                            this.dx = 0;
                            this.dy = -83;
                            break;
                        case 'down':
                            this.dx = 0;
                            this.dy = 0;
                            break;
                    }
                }
            }
        } else { // When player is above first grass blocks, and is on left edge or right edge 
            if (this.x == 0) { // When player is on the left edge
                switch (pressedKey) {
                    case 'right':
                        this.dx = 101;
                        this.dy = 0;
                        break;
                    case 'left':
                        this.dx = 0;
                        this.dy = 0;
                        break;
                    case 'up':
                        this.dx = 0;
                        this.dy = -83;
                        break;
                    case 'down':
                        this.dx = 0;
                        this.dy = 83;
                        break;
                }
            } else { // When player is on the right edge
                switch (pressedKey) {
                    case 'right':
                        this.dx = 0;
                        this.dy = 0;
                        break;
                    case 'left':
                        this.dx = -101;
                        this.dy = 0;
                        break;
                    case 'up':
                        this.dx = 0;
                        this.dy = -83;
                        break;
                    case 'down':
                        this.dx = 0;
                        this.dy = 83;
                        break;
                }
            }
        }
    }
 
    if (this.y == 0) { // When player reaches the river blocks
        this.resetPlayer();
    }
};

Player.prototype.resetPlayer = function() {
    this.x = 202;
    this.y = 415;
    this.dx = 0;
    this.dy = 0;

    resetGems();
};

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

/*
 * Life that player is given, and how player will gain and lose life. 
 */
var Life = function(x, y) {
    // Set up image for life
    this.sprite = 'images/Heart.png';

    // Set up position for life
    this.x = x;
    this.y = y;
};

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * Gems that are laid out on stone blocks for player to pick up.
 */
var Gem = function(imageUrl, name, x, y) {
    this.sprite = imageUrl;

    this.name = name;

    this.x = x;
    this.y = y;
};

// Reset a gem's position
Gem.prototype.reset = function(newX, newY) {
    this.x = newX;
    this.y = newY;
};

var scoreElement = document.getElementById('score');
Gem.prototype.update = function() {
    if (this.x == player.x && this.y == player.y) {
        scoreElement.innerHTML = parseInt(scoreElement.innerHTML) + 50;
        
        var index = allGems.indexOf(this);
        allGems.splice(index, 1);
    }
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var enemy1 = new Enemy(0, 62, 1);
var enemy2 = new Enemy(0, 145, 1.5);
var enemy3 = new Enemy(81, 228, 1);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
// (202, 415) is the initial position of the player
var playerInitPosX = 202;
var playerInitPosY = 415;
var player = new Player(playerInitPosX, playerInitPosY);

// Instantiate the five lives are given to player at the beginning
// of the game
var life1 = new Life(0, 508);
var life2 = new Life(101, 508);
var life3 = new Life(202, 508);
var life4 = new Life(303, 508);
var life5 = new Life(404, 508);

// Place all lives in an array called allLives
var allLives = [life1, life2, life3, life4, life5];

// Instantiate two gems
var gem1 = new Gem('images/Gem Green.png', 'green', 0, 249);
var gem2 = new Gem('images/Gem Orange.png', 'orange', 101, 83);

// Place two gems in an array allGems
var allGems = [gem1, gem2];

// Reset three gems' positions
// Why not put this into a prototype function?
// Each gem's position is unique, so that there needs to be codes
// to monitor which position has been taken by a gem.
// Prototype functions only works on each gem, can't monitor the bigger picture.
function resetGems() {
    allGems = [];
    allGems.push(gem1, gem2);

    // Possible horizontal positions for a gem
    var positionX = [0, 101, 202, 303, 404];
    // Possible vertical position for a gem
    var positionY = [83, 166, 249];
    
    var pickedPositionX = [];
    var pickedPositionY = [];

    var updatedGems = 0;
    while(updatedGems < 2) {
        // Randomly pick an x from positionX array
        var newX = positionX[Math.floor(Math.random() * positionX.length)];
        // Randomly pick an y from positionY array
        var newY = positionY[Math.floor(Math.random() * positionY.length)];
        
        // Check if newX and newY are already picked
        if ((!pickedPositionX.includes(newX)) && (!pickedPositionY.includes(newY))) {
            allGems[updatedGems].reset(newX, newY);

            pickedPositionX.push(newX);
            pickedPositionY.push(newY);

            updatedGems ++;
        }
    }
}

/*
 * Popup modal will show when the game is over.
 */
var modal = document.getElementsByClassName('modal')[0];
var closeButton = document.getElementsByClassName("close")[0];
var finalScore = document.getElementById('modal-final-score');

function showGameOverModal() {
    if (allLives.length == 0) {
        finalScore.innerHTML = scoreElement.innerHTML;
        modal.style.display = "block";
        allLives.push(life1, life2, life3, life4, life5);
    }
}

closeButton.addEventListener("click", function() {
    modal.style.display = "none";
    scoreElement.innerHTML = '0000';
});