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
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Tree image
var treeReady = false;
var treeImage = new Image();
treeImage.onload = function () {
	treeReady = true;
};
treeImage.src = "images/tree.png";
var Tree = function (name,x,y){
	this.name = name;
	this.x = x;
	this.y = y;
}
let tree;


// Hole image
var holeReady = false;
var holeImage = new Image();
holeImage.onload = function () {
	holeReady = true;
};
holeImage.src = "images/hole.png";
var Hole =  function (name,x,y){
	this.name = name;
	this.x = x;
	this.y = y;
}
let hole;


// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	
};
var monster = {
	speed: 5
};

var monstersCaught = 0;
var dies = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var randomtreeamount;
let treelist;
// Reset the game when the player catches a monster
var reset = function () {

	//tree placement
	treelist = []
	randomtreeamount = Math.floor(Math.random() * 10) + 5;
	for (i = 0; i < randomtreeamount; i++) {
		let x = Math.floor(Math.random() * 14+1)*32;
		let y = Math.floor(Math.random() * 13+1)*32;
		if(!(x <= 320 &&
			y <= 304 &&
			x >= 192 &&
			y >= 176 )){
		tree = new Tree(i,x,y);
		treelist.push(tree);
		}
		else(
			i--
		)
	  }

	//hole placement
	holelist = []
	randomholeamount = Math.floor(Math.random() * 10) + 5;
	for (i = 0; i < randomholeamount; i++) {
		let x = Math.floor(Math.random() * 14+1)*32;
		let y = Math.floor(Math.random() * 13+1)*32;
		if(!(x <= 320 &&
			 y <= 304 &&
			 x >= 192 &&
			 y >= 176 )){		
		hole = new Hole(i,x,y);
		holelist.push(hole);
		}
		else(
			i--
		)
	  }


	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
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

	//monstermove
	
	let randomMovement = Math.floor(Math.random() * 96) + 1;
	if (randomMovement == 1) { // Player holding up
		monster.y -= monster.speed;
	}
	if (randomMovement == 2) { // Player holding down
		monster.y += monster.speed;
	}
	if (randomMovement == 3) { // Player holding left
		monster.x -= monster.speed;
	}
	if (randomMovement == 4) { // Player holding right
		monster.x += monster.speed;
	}
	if (randomMovement == 5) { // Player holding up
		monster.y -= monster.speed;
		monster.y += monster.speed;
	}
	if (randomMovement == 6) { // Player holding down
		monster.y += monster.speed;
		monster.y += monster.speed;
	}
	if (randomMovement == 7) { // Player holding left
		monster.x -= monster.speed;
		monster.y -= monster.speed;
	}
	if (randomMovement == 8) { // Player holding right
		monster.x += monster.speed;
		monster.y -= monster.speed;
	}

	// touching a tree?
	for (i = 0; i < randomtreeamount; i++) {
		if (
			hero.x <= (treelist[i].x + 32)
			&& treelist[i].x <= (hero.x + 32)
			&& hero.y <= (treelist[i].y + 32)
			&& treelist[i].y <= (hero.y + 32)
		) {
			keysDown = {}
		}		
	}
	
	// touching a hole?
	for (i = 0; i < randomholeamount; i++) {
		if (
			hero.x <= (holelist[i].x + 32)
			&& holelist[i].x <= (hero.x + 32)
			&& hero.y <= (holelist[i].y + 32)
			&& holelist[i].y <= (hero.y + 32)
		) {
			hero.x = canvas.width / 2;
			hero.y = canvas.height / 2;
			dies++;
		}		
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}

	// Did they hit border?
	if (
		hero.x <= 32
	) {
		hero.x = 32;
	}
	if (
		hero.x >= 448
	) {
		hero.x = 448;
	}
	if (
		hero.y <= 32
	) {
		hero.y = 32;
	}
	if (
		hero.y >= 416
	) {
		hero.y = 416;
	}

	// Did monster hit border?
	if (
		monster.x <= 32
	) {
		monster.x = 32;
	}
	if (
		monster.x >= 448
	) {
		monster.x = 448;
	}
	if (
		monster.y <= 32
	) {
		monster.y = 32;
	}
	if (
		monster.y >= 416
	) {
		monster.y = 416;
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (holeReady){
		for (i = 0; i < randomholeamount; i++) {
			ctx.drawImage(holeImage, holelist[i].x, holelist[i].y);
		  } 
	}

	if (treeReady){
		for (i = 0; i < randomtreeamount; i++) {
		ctx.drawImage(treeImage, treelist[i].x, treelist[i].y);
	  } 
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Deaths: " + dies, 32, 32);
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 52);
	ctx.fillText(Math.floor(timer/20) + " seconds", 32, 72);
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
	else{
		reset();
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