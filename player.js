const playerSpeed = 3;
var isMoving = false;
const inventory = [];                  // array to hold items in player intventory
var items, bombs, potions;             // variables for items group and subgroups

function createItemGroup() {
    items = new Group();
    items.collider = 'kinematic';
    items.debug = true;
    items.overlaps(wizard.sprite);

    bombs = new items.Group();
    bombs.img = 'assets/items/testItem1.png';
    bombs.scale = 2;

    potions = new items.Group();
    potions.img = 'assets/items/testItem2.png';
    potions.scale = 2;
}


class item {
    constructor(x, y) {
        // randomly choose between bomb or potion item - for inventory debug purposes, should be changed later (or not used at all)
        if (Math.round(Math.random()) == 0) {
            this.sprite = new bombs.Sprite(x, y);
            this.itemType = 0;          // 0 for bombs
        } else {
            this.sprite = new potions.Sprite(x, y);
            this.itemType = 1;          // 1 for potions
        }
    }

    get type() {
        return this.itemType;
    }

    itemType;
    sprite;
}

// adds picked up item to inventory
function addItem(item) {
    inventory.push(item);
}



// class for player character
class player {
    // class methods
    constructor() {
        // creates new sprite at 25, 25 with a physical size of 20 x 32 pixels
        this.sprite = new Sprite(25, 25, 20, 32);
        this.sprite.addAni(idleAnim);
        // this.sprite.collider = "none";
        //this.sprite.debug = true;
    }

    // moves player right by setting velocity
    moveRight() {

        this.sprite.vel.x = playerSpeed;
        //this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = false;

    }

    // moves player left by setting velocity
    moveLeft() {
        this.sprite.vel.x = -playerSpeed;
        //this.sprite.changeAni(runAnim);
        this.sprite.mirror.x = true;
    }

    // moves player down by setting velocity
    moveDown() {
        this.sprite.vel.y = playerSpeed;
    }

    //this.sprite.changeAni(runAnim);


    // moves player up by setting velocity
    moveUp() {
        this.sprite.vel.y = -playerSpeed;
    }
    //this.sprite.changeAni(runAnim);

    // stops player movement by setting velocity to 0
    stopMovementX() {
        this.sprite.vel.x = 0;
        if (!this.moving()) {

            this.sprite.changeAni(idleAnim);
        }
    }

    normalizeMovement() {
        this.sprite.vel.normalize().mult(playerSpeed);
    }

    get posx() {
        return this.sprite.position.x;
    }
    get posy() {
        return this.sprite.position.y;
    }


    stopMovementY() {
        this.sprite.vel.y = 0;
        if (!this.moving()) {

            this.sprite.changeAni(idleAnim);
        }
    }

    moving(moving) {
        if ((this.sprite.vel.y == 0) && (this.sprite.vel.x == 0)) {
            moving = false;
        } else {
            moving = true;
        }
        return moving;
    }

    die() {
      if(this.canBeDamaged){
        this.health = 0;
        //Stop all player movement 
        this.sprite.vel.y = 0;
        this.sprite.vel.x = 0;
        //Play the death animation once and once only
        this.sprite.changeAni(deathAnim);
        this.sprite.animation.looping = false;
      }
    }    

    respawn() {
        this.health = 1;
        this.sprite.position.set(25, 25);
        this.sprite.changeAni(idleAnim);  // Change animation to idle when respawning
    }

    //Magic item effect: Make player immune to damage for a short time 
    //TBD: tie to actual magic item 
    //TBD: make it so player movement doesn't remove the shield
    shield() {
        this.sprite.changeAni(shield);
        this.sprite.animation.play();
        this.sprite.animation.looping = false; 

        this.canBeDamaged = false;
        setTimeout(() => {this.canBeDamaged = true; this.sprite.changeAni(idleAnim); this.sprite.animation.play();}, 2000);
    }

    //Magic item effect: teleport the player somewhere random 
    //TBD: tie to actual magic item 
    teleport(){
      //teleports player character to a random spot, using the same math as how enemies are spawned randomly 
        //starting portal animation
        this.sprite.changeAni(teleportJump); 
        this.sprite.animation.frame = 0; 
        this.sprite.animation.play(); 
        this.sprite.animation.looping = false; 

        //actual teleport
        setTimeout(() => {this.sprite.position.set(Math.floor(Math.random() * 401), Math.floor(Math.random() * 401), 1000); this.sprite.animation.play();}, 750); 
  
        //automatially change to idle anim if player does not move 
        setTimeout(() => this.sprite.changeAni(idleAnim), 1500); 
    }

    // class attributes
    sprite;           // player sprite
    health = 1;       // player health - currently operating on assumption that we want 1 hit death
    canBeDamaged = true;  //for shield purposes 
}

class playerEffect extends Player{

}

// checks if inventory is full - right now, inventory can hold 4 items
var inventoryCapacity = 4;
function isInventoryFull() {
    if (inventory.length < inventoryCapacity) {
        return false;
    } else {
        return true;
    }
}

function drawInventory() {
    var drawX;                // where to draw items
    var drawY = height - 30;
    for (let i = 0; i < inventory.length; i++) {
        switch(i) {
            case 0:
                drawX = width - 100;
                break;
            case 1:
                drawX = width - 75;
                break;
            case 2:
                drawX = width - 50;
                break;
            case 3:
                drawX = width - 25;
                break;
        }
        
        if (inventory[i].itemType == 0) {
            let newBomb = new bombs.Sprite(drawX, drawY);
            text('bomb', 350, 350);
        } else if (inventory[i].itemType == 1) {
            let newPotion = new potions.Sprite(drawX, drawY);
            text('potion', 350, 350);
        }
    }
}

function playerMovement() {

    // controls item and wizard interactions - can be moved into function
    for (let i = 0; i < items.length; i++) {
        if (items[i].overlaps(wizard.sprite) && !isInventoryFull()) {
            addItem(items[i]);
            //items[i].life = 0;
        }
    }

    //keeps wizard from moving if they are dead
    if (wizard.health > 0) {
        if (kb.presses('right')) {
            wizard.sprite.mirror.x = false;
            wizard.sprite.changeAni(runAnim);
        }
        if (kb.pressing('right')) { wizard.moveRight(); }
        if (kb.released('right')) { wizard.stopMovementX(); }


        // controls movement left
        if (kb.presses('left')) {
            wizard.sprite.mirror.x = true;
            wizard.sprite.changeAni(runAnim);
        }
        if (kb.pressing('left')) { wizard.moveLeft(); }
        if (kb.released('left')) { wizard.stopMovementX(); }


        // controls movement down
        if (kb.presses('down')) { wizard.sprite.changeAni(runAnim); }
        if (kb.pressing('down')) { wizard.moveDown(); }
        if (kb.released('down')) { wizard.stopMovementY(); }

        // controls movement up
        if (kb.presses('up')) { wizard.sprite.changeAni(runAnim); }
        if (kb.pressing('up')) { wizard.moveUp(); }
        if (kb.released('up')) { wizard.stopMovementY(); }

        if (kb.presses('y')) { wizard.die();}
        // Check if 'r' is pressed to respawn
        if (kb.presses('r')) { respawnPlayer();}

        //debug: force teleport 
        if (kb.presses('t')) { wizard.teleport();}

        //debug: force shield
        if (kb.presses('i')) { wizard.shield();}
    }
}