



export function map(p) {
    return {
        mapData: null,
        tilesetImage: null,
        tileWidth: 16,
        tileHeight: 16,
        mapWidth: null,
        mapHeight: null,
        mapPixelWidth: null,
        mapPixelHeight: null,
        tiles: [],
        tilesetsInfo: [],
        wallChunks: [],

        preload(level) {
            if (level == 'level1') {
                this.preloadLevel1();
            }
        },

        setup(level) {
            this.mapWidth = this.mapData.width;
            this.mapWidth = this.mapData.height;
            this.mapPixelWidth = this.mapWidth * this.tileWidth;
            this.mapPixelHeight = this.mapHeight * this.tileHeight;
            if (level == 'level1') {
                this.parseLayers();

            }
        },

        isWallTile(tileX, tileY) {
            // Iterate through all wall chunks
            for (let chunk of this.wallChunks) {
                // Calculate the boundaries of this chunk
                const chunkStartX = chunk.x;
                const chunkEndX = chunk.x + chunk.width;
                const chunkStartY = chunk.y;
                const chunkEndY = chunk.y + chunk.height;
        
                // Check if the given tile coordinates are within the range of the current chunk
                if (tileX >= chunkStartX && tileX < chunkEndX && tileY >= chunkStartY && tileY < chunkEndY) {
                    // If so, calculate the index of the tile in the chunk data array
                    const index = (tileY - chunk.y) * chunk.width + (tileX - chunk.x);
                    // Check if the tile ID at this position is not 0 (assuming ID 0 represents no wall)
                    if (chunk.data[index] !== 0) {
                        return true; // It's a wall tile
                    }
                }
            }
            return false; // not a wall tile
        },

        draw() {
            p.background("#666666");
            let scaleAmount = 1;
            this.tiles.forEach(tile => {
                p.image(
                    tile.img,
                    tile.dx * scaleAmount,
                    tile.dy * scaleAmount,
                    this.tileWidth * scaleAmount,
                    this.tileHeight * scaleAmount,
                    tile.sx,
                    tile.sy,
                    this.tileWidth,
                    this.tileHeight
                );
            });
        },


        preloadLevel1() {
            this.mapData = p.loadJSON('assets/Maps/level_1.json');
            this.tilesetsInfo.push(p.loadImage('assets/Maps/Dungeon tileset.png'));
        },


        parseLayers() {

            this.mapData.layers.forEach(layer => {
                let isWallLayer = layer.name === 'wall';
                if (layer.type === 'tilelayer') {
                    layer.chunks.forEach(chunk => {
                        if (isWallLayer) {
                            this.wallChunks.push({
                                x: chunk.x,
                                y: chunk.y,
                                width: chunk.width,
                                height: chunk.height,
                                data: chunk.data,
                            });

                        }

                        for (let y = 0; y < chunk.height; ++y) {
                            for (let x = 0; x < chunk.width; ++x) {
                                let tile = chunk.data[y * chunk.width + x];
                                if (tile !== 0) {
                                    this.tiles.push({
                                        img: this.tilesetsInfo[0],
                                        sx: ((tile - 1) % 24) * this.tileHeight,
                                        sy: (Math.floor((tile - 1) / 24)) * this.tileHeight,
                                        dx: (chunk.x + x) * this.tileWidth,
                                        dy: (chunk.y + y) * this.tileHeight,
                                    });
                                }

                            }
                        }

                    });
                }
            }
            );
        },




    };
}