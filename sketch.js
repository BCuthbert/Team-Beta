
export const cameraOffset = 1.6;

import { map } from "./map.js";
// import { GameState } from "./gamestate.js";
import { makePlayer } from "./player.js";
import { overlay } from "./overlay.js";
import { coin } from "./coin.js";



new p5((p) => {
    //const Wizard = new makePlayer(p);
    const Map = new map(p);
    const Wizard = new makePlayer(p, Map);
    const Overlay = new overlay(p);
    const Coin = new coin(p);
    // const Gamestate = new GameState(p);

    // *preload is async*
    p.preload = () => {

        Wizard.preload();
        Map.preload();
        // Overlay.preload();
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // Wizard = new makePlayer(p, Map); //passing the Map object
        // Wizard.setup(); //instantiating the Wizard here
        Overlay.setup();
        Coin.setup();
        // Coin.createCoin(100, 100);

    }

    p.draw = () => {
        // p.ambientLight(50);

        p.camera.on();          // turns camera on (required for coinCount overlay)

        p.clear();
        p.background('#fce1b6');
        Wizard.draw();
        Map.draw(Wizard);
        Wizard.sprite.overlaps(Coin.coins, Wizard.collectCoin);
        // console.log('millis: ' + p.millis());
        if (p.millis() % 50 == 0 && Map.notMenu == true) {
            // Coin.createCoin(Math.floor(Math.random() * 1486), Math.floor(Math.random() * 718));
            Coin.createCoin(Coin.randomInterval(50, 1486), Coin.randomInterval(75, 718));
        }

        p.camera.off();         // turns camera off before drawing overlay so that it moves with player 
        Overlay.draw();

        // overlayText.draw();
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
})


// function setupButtons() {
//     startButton = new Button({
//         x: width / 2, y: height - 50,
//         width: 100, height: 50,
//         align_x: 0, align_y: 0,
//         content: 'Click to Start',
//         on_press() {
//             state++;
//         }
//     })
// }




// // preload images for animation - executed once
// function preload() {
//     loadanimations();
// }



// function draw() {
//     // state = 0 corresponds to start screen
//     if (state == 0) {
//         background("#5cb8ff");   // arbitrary color choice, can be changed
//         fill(0);
//         textSize(50);
//         textAlign(CENTER);
//         text("The Wizard's Quest", width / 2, height / 2);
//         startButton.draw();
//         wizard.sprite.changeAni(emptyAnim);
//     }
//     // state = 1 corresponds to level0
//     if (state == 1) {
//         background("#fce1b6");   // arbitrary color choice, can be changed
//         if (level0Drawn == 0) { drawLevel0(); }   // makes sure level sprites only get drawn once - breaks otherwise
//         textAlign(LEFT);
//         text('WASD to move\n' +
//             'Click to attack (mouse to aim)\n' +
//             'Space to shoot fireball sideways\n' +
//             'Press 1 to change attack\n' +
//             'Press b to spawn golem enemy\n' +
//             'Hold o to activate golem behavior (must be holding for attacks to effect them)\n' +
//             'Press y to die\n' +
//             'Press r to respawn', 50, 100);
//     }

//     // Center the canvas around the player

//     // press b to spawn golem in random pos
//     if (kb.presses('b')) {
//         let newGolem;
//         newGolem = new golem(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401));
//     }


//     if (state != 0) { castSpell(); }          // prevents spells from being cast on title screen
//     golemBehavior();

//     // Respawn player when 'r' is pressed
//     if (kb.presses('r') && !respawnState) {
//         respawnPlayer();
//         respawnState = true;
//     }
