
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image

//var monsterImage = new Image();

//monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
let monsterImage = new Image();

var monsterReady = true;
class Monster {
	constructor(){
		monsterReady = false;
		
		
		
	}
}

class Goblin extends Monster {
	constructor(){
		super()
		monsterImage.src = "images/goblin1.png";
		console.log(name + "created");
	}
}


let goblin1 = new Goblin();

var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	throwMonster(goblin1);
	
};

// Throw the monster somewhere on the screen randomly
function throwMonster(monster) {
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
}



// Update game objects
var update = function (modifier) {

	//movement
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (Monster.x + 32)
		&& Monster.x <= (Mero.x + 32)
		&& hero.y <= (Monster.y + 32)
		&& Monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		
		reset();
	}
	//monsters move
};

let image = new Image();
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	monsterImage.onload = function () {
		monsterReady = true;
	};

	if (monsterReady) {
				
		ctx.drawImage(Monster.monsterImage, goblin1.x, goblin1.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
	ctx.fillText(Math.floor(timer/20) + " seconds", 32, 52);
};



// The main game loop
var main = function () {
	
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	if(timer > 0){
		timer--
	requestAnimationFrame(main);
	}
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
var timer = 600;
reset();
main();