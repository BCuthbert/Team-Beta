let floor1, floor7, torches, tilesGroup;


function setup() {
    //createCanvas(windowWidth, windowHeight);
    
    createCanvas(1920,1080);

    world.gravity.y = 0;

    floor1 = new Group();
    floor7 = new Group();
    torches = new Group();

    floor1.w = 10, floor1.h = 10;
    floor7.w = 10, floor7.h = 10;
    torches.w = 10, torches.h = 10;

    torches.tile = '!';
    floor1.tile = '_';
    floor7.tile = '=';

    floor1.img = 'assets/levelTiles/Dungeon tileset/tile001.png';
    floor7.img = 'assets/levelTiles/Dungeon tileset/tile007.png';
    torches.img = 'assets/levelTiles/Dungeon tileset/01.gif';

    floor7.collider = 'static';
    
    torches.layer = 0;
    floor7.rotationLock = true;
}

// Array of tiles on the map
let mapObject0 = [];
tileSize = 16;


function draw() {

    if (mouseIsPressed) {
        setTile();
    } 
    

    if (keyIsDown(UP_ARROW)) {} // Move Canvas up
    else if (keyIsDown(DOWN_ARROW)) {} // Move canvas down
    if (keyIsDown(RIGHT_ARROW)) {} // Move canvas right
    else if(keyIsDown(LEFT_ARROW)) {} // Move canvas left

    // Used to detect Enter key press
    if(keyIsDown(ENTER)){
        // Prevents continuous key reads
        if(keyCode === ENTER){
            // Save Canvas
            let mapObject0JSON = [];
            let tmpStr = {};

            // Converts the Sprite into a non sprite object, because sprites cannot be saved to JSON files
            mapObject0.forEach(element => {
                tmpObj = {
                    "img" : "",
                    "collider" : "",
                    "x" : 0,
                    "y" : 0
                };
                tmpObj.img = element.Sprite.img.url;
                tmpObj.collider = element.Sprite.collider;
                tmpObj.x = element.Sprite.x;
                tmpObj.y = element.Sprite.y;
                tmpStr = JSON.stringify(tmpObj);
                mapObject0JSON.push(tmpStr);
            });

            saveJSON(mapObject0JSON, 'map0.json');
            print(mapObject0JSON);
            print("Canvas Saved");
            keyCode = null;
        }
    }
}

function setTile(){
    // Setting coordinates to closest grid space to mouse location
    let X = Math.round(mouseX/tileSize)*tileSize;
    let Y = Math.round(mouseY/tileSize)*tileSize;

    // Creating an object for a new tile
    let tmpTile = {};

    // Setting tile attributes
    tmpTile.name = "Tile " + X + " " + Y;

    tmpSprite = new Sprite();
    tmpSprite.img = 'assets/levelTiles/Dungeon tileset/tile007.png';
    tmpSprite.collider = 'static';
    tmpSprite.x = X;
    tmpSprite.y = Y;

    tmpTile.Sprite = tmpSprite;

    // Adding the tile into the level map
    mapObject0.push(tmpTile);
}