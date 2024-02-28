let mapData;
let tilesetImage;
let tileWidth = 16; //Width of each tile in pixels
let tileHeight = 16;
let mapWidth, mapHeight; // Map dimensions in tiles
let tiles = []; // Stores information about each tile
let tilesetsInfo = []; // Stores information about tilesets

//load map data and tileset images
function preload() {
    // Load the JSON formatted map data
    mapData = loadJSON('assets/Maps/level_1.json');
    // Load the tileset image and add its information to the tilesetsInfo array
    tilesetsInfo.push(loadImage('assets/Maps/Dungeon tileset.png'));
}

// initial settings and map data initialization
function setup() {
    createCanvas(windowWidth, windowHeight); // Create a canvas sized to the browser window
    noLoop(); // Ensure draw() runs only once
    
    // get map's width and height from the map data
    mapWidth = mapData.width;
    mapHeight = mapData.height;
    // Parse the layers for rendering preparation
    parseLayers();
}

// Parse map layers and extract tile data for rendering
function parseLayers() {
    // Iterate over all layers in the map data
    mapData.layers.forEach(layer => {
        // Process layers of type 'tilelayer'
        if (layer.type === 'tilelayer') {
            // Iterate over chunks within the layer
            layer.chunks.forEach(chunk => {
                // Iterate over each tile within the chunk
                for (let y = 0; y < chunk.height; y++) {
                    for (let x = 0; x < chunk.width; x++) {
                        let tile = chunk.data[y * chunk.width + x];
                        // If the tile ID is not 0, it means there's a tile to render at this position
                        if (tile !== 0) { 
                            // Calculate the source image coordinates and destination render coordinates, then add the tile information to the tiles array
                            tiles.push({
                                img: tilesetsInfo[0], 
                                sx: ((tile - 1) % 24) * tileWidth, // Source image x-coordinate
                                sy: Math.floor((tile - 1) / 24) * tileHeight, // Source image y-coordinate
                                dx: (chunk.x + x) * tileWidth, // Destination render x-coordinate
                                dy: (chunk.y + y) * tileHeight // Destination render y-coordinate
                            });
                        }
                    }
                }
            });
        }
    });
}

// rendering the map on the canvas
function draw() {
    background(0); // Set the background color
    
    // Calculate the center of the canvas
    let canvasCenterX = width / 2;
    let canvasCenterY = height / 2;

    // Calculate the pixel dimensions of the map
    let mapPixelWidth = mapWidth * tileWidth;
    let mapPixelHeight = mapHeight * tileHeight;

    // Calculate the offset to center the map on the canvas
    let offsetX = canvasCenterX - mapPixelWidth / 2;
    let offsetY = canvasCenterY - mapPixelHeight / 2;

    // Iterate and render each tile
    tiles.forEach(tile => {
        image(tile.img, tile.dx + offsetX, tile.dy + offsetY, tileWidth, tileHeight, tile.sx, tile.sy, tileWidth, tileHeight);
    });
}