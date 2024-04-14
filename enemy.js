



export function enemy(p) {
    return {
        sprite: null,
        enemies: null,
        animations: {},
        health: 1,
        speed: 3,
        isDead: false,


        setup() {
            this.enemies = new p.Group();
            this.enemies.collider = 'none';
            this.enemies.scale = 2;
            console.log(p.minute());
        },

        preload() {
            this.loadAnimations();
        },

        loadAnimations() {
            this.animations.idle = p.loadAnimation('assets/golemIdle.png',
                { frameSize: [16, 16], frames: 4 });
            this.animations.idle.frameDelay = 17;

            this.animations.run = p.loadAnimation('assets/golemIdle.png',
                { frameSize: [16, 16], frames: 4 });
            this.animations.run.frameDelay = 5;
        },

        spawn(x, y) {

            this.sprite = new this.enemies.Sprite(x, y);
            this.sprite.mode = 'UNAWARE';
            // console.log(this.sprite.mode);
            this.sprite.addAni(this.animations.idle);
        },

    };
}