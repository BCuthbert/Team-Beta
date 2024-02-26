var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation

var i = 0;

let electricAnim;
const electricFrames = 20;

let currentLevel = 0;


function setup() {
    createCanvas(windowWidth, windowHeight);

    // Set up initial level (Level 0)
    setupLevel0();
    createGolemGroup();

    // any other setup code y'all wanna put in. 

    // Add a key press event listener
    window.addEventListener('keydown', keyPressed);
}

// Loads all animations for sprites in the project.
function loadanimations() {
    // loads idle animation sprite sheet (strip), and seperates frames
    idleAnim = loadAnimation("assets/idleAnimSheet.png",
        { frameSize: [32, 32], frames: 2 });
    idleAnim.frameDelay = 18;     // slows down idle animation


    // loads run animation sprite sheet (strip), and seperates frames
    runAnim = loadAnimation("assets/runAnimSheet.png",
        { frameSize: [32, 32], frames: 6 });

    // loads idle animation for golem enemy
    golemIdle = loadAnimation("assets/golemIdle.png",
    { framesize: [16, 16], frames: 4 });
    golemIdle.frameDelay = 17;   

    // loads run animation
    golemRun = loadAnimation("assets/golemIdle.png",
    { framesize: [16, 16], frames: 4 });
    golemRun.frameDelay = 5;
    

    fireballAnim = loadAnimation(
        'assets/fireball/FB001.png',
        'assets/fireball/FB002.png',
        'assets/fireball/FB003.png',
        'assets/fireball/FB004.png'
    );
    fireballAnim.frameDelay = 15;

    electricAnim = loadAnimation(
        "assets/electric/tile1.png",
        "assets/electric/tile2.png",
        "assets/electric/tile3.png",
        "assets/electric/tile4.png"
    );
    electricAnim.frameDelay = electricFrames;

}

// tests movement functions - not sure if this is good enough or not (never done TDD tbh)
var i = 0;             // argument for testPlayerMovement()
function testPlayerMovement(i) {
    if (i < 100) { wizard.moveRight(); };
    if (i > 100 && i < 200) { wizard.moveDown(); };
    if (i > 200 && i < 300) { wizard.moveLeft(); };
    if (i > 300) { wizard.moveUp(); };
}

// preload images for animation - executed once
function preload() {
    loadanimations();
    createGolemGroup();
}

// Currently implemented in level0
// // setup canvas and player sprite - executed once
// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     wizard = new player();
//     tempSprite = new Sprite();
//     wizard.sprite.overlaps(tempSprite);
// }

var i = 0;             // argument for testPlayerMovement()

function draw() {
    background("#fce1b6");   // arbitrary color choice, can be changed

    text('WASD to move\n' +
         'Click to attack (mouse to aim)\n' +
         'Space to shoot fireball sideways\n' +
         'Press 1 to change attack\n' +
         'Press b to spawn golem enemy\n' +
         'Hold o to activate golem behavior (must be holding for attacks to effect them)', 50, 50);

    // press b to spawn golem in random pos
    if (kb.presses('b')) {
        let newGolem;
        newGolem = new golem(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
    }

    /*
    if (currentLevel === 0) {
        import('./level0.js').then(level0 => {
            // Use level0 as needed
        }).catch(error => console.error(error));
    } else if (currentLevel === 1) {
        import('./level1.js').then(level1 => {
            // Use level1 as needed
        }).catch(error => console.error(error));
    }

    // Center the canvas around the player
    translate(width / 2 - wizard.sprite.position.x, height / 2 - wizard.sprite.position.y);
    */

    // Draw the player
    wizard.sprite.draw();

    playerMovement();

    // Normalize movement, so player does not move faster in diagonal movements
    // see pyth. theorem
    wizard.normalizeMovement();
    castSpell();
    golemBehavior();
}

/*
function transitionToLevel1() {
    // Remove elements from Level 0
    floor1.removeSprites();
    floor7.removeSprites();
    torches.removeSprites();
    golems.removeSprites();

    // Set up Level 1
    setupLevel1();
    createGolemGroupLevel1();
    wizard.sprite.position.set(50, 50); // Set the initial position of the player in Level 1

    // Optionally, you can set other properties or perform additional setup for Level 1

    // Switch to Level 1
    currentLevel = 1;
}

// Key press event handler
function keyPressed(event) {
    // Check if the pressed key is "L"
    if (event.key === 'L') {
        // Call the transition function when "L" is pressed
        transitionToLevel1();
    }
}

function setupLevel1() {
    floor1_level1 = new Group();
    floor7_level1 = new Group();
    torches_level1 = new Group();

    floor1_level1.w = 10, floor1_level1.h = 10;
    floor7_level1.w = 10, floor7_level1.h = 10;
    torches_level1.w = 10, torches_level1.h = 10;

    torches_level1.tile = '!';
    floor1_level1.tile = '_';
    floor7_level1.tile = '=';

    floor1_level1.img = 'assets/levelTiles/tile001.png';
    floor7_level1.img = 'assets/levelTiles/tile007.png';
    torches_level1.img = 'assets/levelTiles/01.gif';

    floor1_level1.collider = 'kinematic';
    floor7_level1.collider = 'kinematic';
    torches_level1.collider = 'kinematic';

    tilesGroup_level1 = new Tiles(
        [
            '___==============___',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '__=______________=__',
            '___==============___'
        ],
        50,
        50,
        floor7_level1.w + 6,
        floor7_level1.h + 6,
        torches_level1.w + 6,
        torches_level1.h + 6,
        floor1_level1.w + 6,
        floor1_level1.h + 6
    );

    torches_level1.layer = 0;
    floor7_level1.rotationLock = true;

    // Optionally, you can add more setup code for Level 1 here
}
*/
