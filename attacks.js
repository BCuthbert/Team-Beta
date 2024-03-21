var fireballAnim;
const spells = [];
const spellSpeed = 7;

var currentAttack = 0;
const angleSpeed = 7;

import { cameraOffset } from "./sketch.js";


export function makeSpell(p, type) {
    return {
        spellSpeed: 5,
        spellSprite: null,
        spellAnims: {},
        lifeSpan: 100,
        currentAngle: null,
        angles: [],
        camOffset: cameraOffset,
        angleProjectileRef: null,
        angleEnabled: true,
        alreadyCollided: false,

        // need draw to check collisions between angleshot and angles
        draw() {

            if (this.angleProjectileRef != null) {


                if (this.angleProjectileRef.overlaps(this.angles[0])) {
                    this.angleProjectileRef.vel.x = this.angles[1].position.x - this.angles[0].position.x;
                    this.angleProjectileRef.vel.y = this.angles[1].position.y - this.angles[0].position.y;
                    this.angleProjectileRef.vel.normalize().mult(this.spellSpeed);
                    this.alreadyCollided = true;
                }
                if (this.angleProjectileRef.overlaps(this.angles[1]) && this.alreadyCollided) {
                    this.angleProjectileRef.remove();
                    this.angleProjectileRef = null;

                    this.angleEnabled = true;
                    this.currentAngle = null;
                    this.angles[0].remove();
                    this.angles[1].remove();
                    this.angles = [];
                    this.alreadyCollided = false;
                }


            }
        },

        setup() {
            this.loadAnimations();
        },

        cast(x, y, type) {
            if (type == 0) {
                this.fireball(x, y);
            } else if (type == 1) {
                this.electric(x, y);
            } else if (type == 2) {
                this.angleshot(x, y);
            }
        },

        angleshot(x, y) {
            if (this.angleEnabled) {
                this.currentAngle = new p.Sprite((p.mouseX - p.width / 2) / this.camOffset + x, (p.mouseY - p.height / 2) / this.camOffset + y);
                this.currentAngle.color = "red";
                this.currentAngle.stroke = "black";
                this.currentAngle.diameter = 11 / this.camOffset;
                this.currentAngle.collider = "none";
                this.angles.push(this.currentAngle);
            }

            if (this.angles.length == 2 && this.angleEnabled) {
                this.angleEnabled = false;
                this.angleProjectileRef = new p.Sprite(x, y, 20);
                this.angleProjectileRef.addAni(this.spellAnims.angleAnim);
                this.angleProjectileRef.scale = 0.2;
                this.angleProjectileRef.debug = true;
                this.angleProjectileRef.collider = 'none';

                this.angleProjectileRef.vel.x = this.angles[0].position.x - x;
                this.angleProjectileRef.vel.y = this.angles[0].position.y - y;
                this.angleProjectileRef.vel.normalize().mult(this.spellSpeed);
            }

        },

        electric(x, y) {
            this.spellSprite = new p.Sprite(x, y);
            this.spellSprite.collider = "none";
            this.spellSprite.addAni(this.spellAnims.electric);
            p.angleMode(p.RADIANS);
            this.spellSprite.rotation = Math.atan2(p.mouseY - p.height / 2, p.mouseX - p.width / 2);
            this.spellSprite.vel.y = p.mouseY - p.height / 2;
            this.spellSprite.vel.x = p.mouseX - p.width / 2;
            this.spellSprite.vel.normalize().mult(this.spellSpeed);
            this.spellSprite.life = this.lifeSpan;

        },

        fireball(x, y) {
            this.spellSprite = new p.Sprite(x, y);
            this.spellSprite.debug = true;
            this.spellSprite.collider = "none";
            this.spellSprite.addAni(this.spellAnims.fireball);
            p.angleMode(p.RADIANS);
            this.spellSprite.rotation = Math.atan2(p.mouseY - p.height / 2, p.mouseX - p.width / 2);
            this.spellSprite.vel.y = p.mouseY - p.height / 2;
            this.spellSprite.vel.x = p.mouseX - p.width / 2;
            this.spellSprite.vel.normalize().mult(this.spellSpeed);
            this.spellSprite.life = this.lifeSpan;
            this.spellSprite.id = 10;
        },



        loadAnimations() {
            this.spellAnims.fireball = p.loadAnimation(
                'assets/fireball/FB001.png',
                'assets/fireball/FB002.png',
                'assets/fireball/FB003.png',
                'assets/fireball/FB004.png'
            );
            this.spellAnims.fireball.frameDelay = 15;

            this.spellAnims.electric = p.loadAnimation(
                "assets/electric/tile1.png",
                "assets/electric/tile2.png",
                "assets/electric/tile3.png",
                "assets/electric/tile4.png"
            );
            this.spellAnims.electric.frameDelay = 20;

            this.spellAnims.angleAnim = p.loadAnimation(
                "assets/tile001.png",
                "assets/tile002.png",
                "assets/tile003.png",
                "assets/tile004.png"
            );
            this.spellAnims.angleAnim.frameDelay = 15;
        },

    };
}