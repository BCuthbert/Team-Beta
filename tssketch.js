var wizard;                // declare variable that will refer to player object
var idleAnim;              // declare variable for idle animation
var runAnim;               // declare variable for run animation
var emptyAnim;
var state = 0;             // controls state (title screen, level0, level1 etc)
var startButton;           // variable for title screen start button
var level0Drawn = 0;       // variable used in drawing level0



var i = 0; // for movement test func

let electricAnim;
const electricFrames = 20;

let angleShotAnim;

// Loads all animations for sprites in the project.
function loadanimations() {
    // loads idle animation sprite sheet (strip), and seperates frames
    idleAnim = loadAnimation("assets/idleAnimSheet.png",
        { frameSize: [32, 32], frames: 2 });
    idleAnim.frameDelay = 18;     // slows down idle animation


    // loads run animation sprite sheet (strip), and seperates frames
    runAnim = loadAnimation("assets/runAnimSheet.png",
        { frameSize: [32, 32], frames: 6 });

    //loads death animation sprite sheet and seperates frames
    deathAnim = loadAnimation("assets/deathAnimSheet.png",
        { frameSize: [32, 32], frames: 10 });

    emptyAnim = loadAnimation("assets/emptyAnim.png",
    { frameSize: [32, 32], frames: 1 });

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

    angleShotAnim = loadAnimation(
        "assets/tile001.png",
        "assets/tile002.png",
        "assets/tile003.png",
        "assets/tile004.png"
    );

    angleShotAnim.frameDelay = 15;
    // angleShotAnim.scale = 0.2;

}

// tests movement functions - not sure if this is good enough or not (never done TDD tbh)
function testPlayerMovement(i) {
    if (i < 100) { wizard.moveRight(); };
    if (i > 100 && i < 200) { wizard.moveDown(); };
    if (i > 200 && i < 300) { wizard.moveLeft(); };
    if (i > 300) { wizard.moveUp(); };
}

function setupButtons() {
    startButton = new Button({
        x: width/2, y: height - 50,
        width: 100, height: 50,
        align_x: 0, align_y: 0,
        content: 'Click to Start',
        on_press() {
            state++;
        }
    })
}

// preload images for animation - executed once
function preload() {
    loadanimations();
    preloadLevel1();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    wizard = new player();
    setupButtons();
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

var test;


function draw() {
    clear();

    if (state == 0) {
        background("#5cb8ff");
        fill(0);
        textSize(50);
        textAlign(CENTER);
        text("The Wizard's Quest", width / 2, height / 2);
        startButton.draw();
        wizard.sprite.changeAnimation(emptyAnim);
    } else if (state == 1) {
        if (!level0Drawn) {
            setupLevel1();
            level0Drawn = true;
        }
        drawLevel1();
        wizard.sprite.draw();

        playerMovement();
        if (kb.presses('b')) {
            let newGolem = new golem(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
        }
        wizard.normalizeMovement();
        if (state != 0) { castSpell(); }
        golemBehavior();
    }
}