
// const originalPlayerSpeed = 3;
// const scaleAmount = 3;
// const adjustedPlayerSpeed = originalPlayerSpeed / scaleAmount;
// var isMoving = false;


// class for player character
// TODO: implement collisionBox, and collidingwithwall() from zzio's commit(below in class player, which will be absorbed into makePlayer())

// class player {
//     // class methods
//     constructor() {
//         this.sprite = new Sprite(250, 190, 20, 32);
//         this.sprite.addAni(idleAnim);

//         this.collisionBox = {
//             offsetX: 4,
//             offsetY: 28,
//             width: 12,
//             height: 4
//         };
//     }

//     isCollidingWithWall(nextX, nextY) {
//         return false;
//     }

//     moveRight() {
//         const nextX = this.sprite.position.x + adjustedPlayerSpeed;
//         const nextY = this.sprite.position.y;
//         if (!this.isCollidingWithWall(nextX, nextY)) {
//             this.sprite.vel.x = adjustedPlayerSpeed;
//             this.sprite.mirror.x = false;
//         } else {
//             this.sprite.vel.x = 0;
//         }
//     }

//     moveLeft() {
//         const nextX = this.sprite.position.x - adjustedPlayerSpeed;
//         const nextY = this.sprite.position.y;
//         if (!this.isCollidingWithWall(nextX, nextY)) {
//             this.sprite.vel.x = -adjustedPlayerSpeed;
//             this.sprite.mirror.x = true;
//         } else {
//             this.sprite.vel.x = 0;
//         }
//     }

//     moveDown() {
//         const nextX = this.sprite.position.x;
//         const nextY = this.sprite.position.y + adjustedPlayerSpeed;
//         if (!this.isCollidingWithWall(nextX, nextY)) {
//             this.sprite.vel.y = adjustedPlayerSpeed;
//         } else {
//             this.sprite.vel.y = 0;
//         }
//     }

//     moveUp() {
//         const nextX = this.sprite.position.x;
//         const nextY = this.sprite.position.y - adjustedPlayerSpeed;
//         if (!this.isCollidingWithWall(nextX, nextY)) {
//             this.sprite.vel.y = -adjustedPlayerSpeed;
//         } else {
//             this.sprite.vel.y = 0;
//         }
//     }
// }


import { makeSpell } from "./attacks.js";
import { cameraOffset } from "./sketch.js";

export var coinCount = 0;

export function makePlayer(p, Map) { //Receive map object
    return {
        sprite: new p.Sprite(25, 25, 20, 32),
        currentAnimation: null,
        animations: {},
        speed: 3,
        isDead: false,
        health: 1,
        spells: [],
        attackMode: 0,
        spell: null,
        invincible: false,
        camOffset: cameraOffset,
        inventory: [],
        map: Map,//Store Map objects
        disabled: false,
        //coinCount: 0,

        draw() {
            p.camera.on();
            p.camera.x = this.sprite.position.x;
            p.camera.y = this.sprite.position.y;
            p.camera.zoom = this.camOffset;

            this.spell.draw(this.sprite.position.x, this.sprite.position.y);

            if (!this.isDead && !this.disabled) {
                // if player, is dead, they cannot cast, die again, move, or teleport
                this.movement();
                if (p.kb.presses('y')) {

                    this.die();

                }

                if (p.mouse.presses()) {
                    // cast spell, and move it into spell array
                    this.spell.cast(this.sprite.position.x, this.sprite.position.y, this.attackMode);
                    this.spells.push(this.spell);

                }
                if (p.kb.presses('1')) {
                    // switch attack mode (to be changed to keybinds later)
                    this.attackMode++;
                    console.log(`X: ${this.sprite.position.x}, Y: ${this.sprite.position.y}`);
                    if (this.attackMode > 2) {

                        this.attackMode = 0;

                    }
                }
                if (p.kb.presses('t')) {

                    this.teleport();

                }
                if (p.kb.presses('i')) {

                    this.shield();

                }
            }
            if (p.kb.presses('r')) {

                this.respawn();
            }


        },

        disable() {
            this.sprite.visible = false;
            this.disabled = true;
        },

        enable() {
            this.sprite.visible = true;
            this.disabled = false;
        },

        normalizeMovement() {
            this.sprite.vel.normalize().mult(this.speed);
        },

        preload() {
            this.spell = new makeSpell(p, this.attackMode);
            this.spell.setup();
            this.loadAnimations();
            this.sprite.rotationLock = true;
            this.sprite.addAni(this.animations.idle);
        },



        die() {
            this.health = 0;
            // Stop all player movement 
            this.sprite.vel.y = 0;
            this.sprite.vel.x = 0;

            // Set the animation to the first frame of the death animation
            this.sprite.changeAni(deathAnim);
            this.sprite.animation.frame = 0;

            // Play the death animation once and once only
            this.sprite.animation.play();
            this.sprite.animation.looping = false;
        },

        respawn() {
            this.health = 1;
            this.sprite.position.set(25, 25);
            this.sprite.changeAni(idleAnim);  // Change animation to idle when respawning
        },

        loadAnimations() {
            this.animations.idle = p.loadAnimation("assets/idleAnimSheet.png",
                { frameSize: [32, 32], frames: 2 });
            this.animations.idle.frameDelay = 18;     // slows down idle animation


            this.animations.run = p.loadAnimation("assets/runAnimSheet.png",
                { frameSize: [32, 32], frames: 6 });

            this.animations.death = p.loadAnimation("assets/deathAnimSheet.png",
                { frameSize: [32, 32], frames: 10, loop: false });

            this.animations.teleport = p.loadAnimation('assets/teleportAnimSheet.png',
                { frameSize: [32, 32], frames: 1 });

            this.animations.shield = p.loadAnimation('assets/shieldAnimSheet.png',
                { frameSize: [32, 32], frames: 1 });

        },


        moveRight() {
            const newX = this.sprite.position.x + this.speed;
            const newY = this.sprite.position.y;
            //Convert to tile coordinates
            const tileX = Math.floor(newX / this.map.tileWidth);
            const tileY = Math.floor(newY / this.map.tileHeight);

            //Check if the new position will hit the wall
            if (!this.map.isWallTile(tileX, tileY)) {
                this.sprite.vel.x = this.speed;
                this.sprite.mirror.x = false;
            } else {
                //If it hits a wall, stop moving
                this.sprite.vel.x = 0;
            }
        },

        moveLeft() {
            const newX = this.sprite.position.x - this.speed;
            const newY = this.sprite.position.y;
            const tileX = Math.floor(newX / this.map.tileWidth);
            const tileY = Math.floor(newY / this.map.tileHeight);

            if (!this.map.isWallTile(tileX, tileY)) {
                this.sprite.vel.x = -this.speed;
                this.sprite.mirror.x = true;
            } else {
                this.sprite.vel.x = 0;
            }
        },

        moveUp() {
            const newX = this.sprite.position.x;
            const newY = this.sprite.position.y - this.speed;
            const tileX = Math.floor(newX / this.map.tileWidth);
            const tileY = Math.floor(newY / this.map.tileHeight);

            if (!this.map.isWallTile(tileX, tileY)) {
                this.sprite.vel.y = -this.speed;
            } else {
                this.sprite.vel.y = 0;
            }
        },


        moveDown() {
            const newX = this.sprite.position.x;
            const newY = this.sprite.position.y + this.speed;
            const tileX = Math.floor(newX / this.map.tileWidth);
            const tileY = Math.floor(newY / this.map.tileHeight);

            if (!this.map.isWallTile(tileX, tileY)) {
                this.sprite.vel.y = this.speed;
            } else {
                this.sprite.vel.y = 0;
            }
        },

        normalize() {
            this.sprite.vel.normalize().mult(this.speed);
        },


        isMoving() {
            if ((this.sprite.vel.y == 0) && (this.sprite.vel.x == 0)) { return true; } else { return false; };
        },


        stopMovementX() {
            this.sprite.vel.x = 0;
            //if (!this.isMoving()) {
            this.sprite.changeAni(this.animations.idle);
            //}
        },

        stopMovementY() {
            this.sprite.vel.y = 0;
            //if (!this.isMoving()) {
            this.sprite.changeAni(this.animations.idle);
            //}
        },

        movement() {
            if (p.kb.presses('up')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('up')) {
                this.moveUp();
                this.movingVert = true;
            };
            if (p.kb.released('up')) {
                this.stopMovementY();
                this.movingVert = false;
            };


            if (p.kb.presses('down')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('down')) {
                this.moveDown();
                this.movingVert = true;
            };
            if (p.kb.released('down')) {
                this.stopMovementY();
                this.movingVert = false;
            };


            if (p.kb.presses('right')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('right')) {
                this.moveRight();
                this.movingLat = true;
            };
            if (p.kb.released('right')) {
                this.stopMovementX();
                this.movingLat = false;
            };


            if (p.kb.presses('left')) {
                this.sprite.changeAni(this.animations.run);
            };
            if (p.kb.pressing('left')) {
                this.moveLeft();
                this.movingLat = true;
            };
            if (p.kb.released('left')) {
                this.stopMovementX();
                this.movingLat = false;
            };

            // diaganol movement => normalize vector and mult by speed
            if (this.movingLat && this.movingVert) { this.normalizeMovement(); }
        },


        die() {
            // stop player movement
            this.sprite.vel.x = 0;
            this.sprite.vel.y = 0;

            // changes animation
            this.sprite.changeAni(this.animations.death);
            this.sprite.animation.frame = 0;
            this.sprite.animation.play();
            this.sprite.animation.looping = false;



            this.isDead = true;
        },

        respawn() {
            this.isDead = false;
            this.health = 1;
            this.sprite.position.set(25, 25);
            this.sprite.changeAni(this.animations.idle);
        },

        teleport() {
            this.sprite.changeAni(this.animations.teleport);
            this.sprite.animation.frame = 0;
            this.sprite.animation.play();
            this.sprite.animation.looping = false;
            //actual teleport
            setTimeout(() => { this.sprite.position.set(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401), 1000); this.sprite.animation.play(); }, 750);

            //automatially change to idle anim if player does not move 
            setTimeout(() => this.sprite.changeAni(this.animations.idle), 1500);
        },

        shield() {
            this.sprite.changeAni(this.animations.shield);
            this.sprite.animation.play();
            this.sprite.animation.looping = false;

            this.invincible = true;

            setTimeout(() => { this.invincible = false; this.sprite.changeAni(this.animations.idle); this.sprite.animation.play(); }, 2000);
        },

        deleteSpell(id) {

        },

        collectCoin(player, coin) {
            coinCount++;
            console.log(coinCount);
            coin.remove();
        }


    };
}