
import { GameState } from "./gamestate.js";

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
        state: new GameState(p),
        btnref: p.createButton("Begin Quest"),
        levelLoaded: false,
        loadOnce: false,

        preload() {
            this.tilesetsInfo.push(p.loadImage('assets/Maps/Dungeon tileset.png'));
            if (this.state.getState() == 'menu') {
                this.btnref.style("background-color", "#ff5959");
            }
        },

        setup() {

            this.mapWidth = this.mapData.width;
            this.mapHeight = this.mapData.height;
            this.mapPixelWidth = this.mapWidth * this.tileWidth;
            this.mapPixelHeight = this.mapHeight * this.tileHeight;

        },



        async draw(w) {

            if (this.state.getState() == 'menu') {
                w.disable()
                p.background("#5cb8ff");
                p.textSize(30);
                p.textAlign(p.CENTER);
                var txtref = p.text("The Wizard's Quest", 50, -50);
                this.btnref.position(p.width / 2, p.height / 2);
                this.btnref.style("border-radius", "20%");
                this.btnref.style("padding-top", "10px");
                this.btnref.style("padding-bottom", "10px");
                this.btnref.mouseOver(() => {
                    this.btnref.style("background-color", "white");
                })
                this.btnref.mouseOut(() => {
                    this.btnref.style("background-color", "#ff5959");
                });
                this.btnref.mouseClicked(() => {
                    this.btnref.remove();
                    w.enable();
                    this.state.changeState(1);

                })


            } else {
                if (!this.levelLoaded) {
                    this.mapData = await this.preloadLevel("assets/Maps/level_1.json");
                    this.setup();
                    this.levelLoaded = true;
                } else if (!this.loadOnce) {
                    this.parseLayers();
                    this.loadOnce = true;
                } else {

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
                }
            }

        },

        preloadLevel(fileRef) {
            // returns a 'promise' to resolve loadJSON.
            // Due to loadJSON having to parse a large file, it needs to be asynchronous,
            // and needs to return a promise to fulfill the variable, rather than just the variable.


            return new Promise((resolve) => {
                resolve(p.loadJSON(fileRef));
            });
        },

        parseLayers() {
            // console.log(this.tiles);
            var tmpTileset = this.tilesetsInfo[0];
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
                                        img: tmpTileset,
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