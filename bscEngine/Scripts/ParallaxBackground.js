import { Layer } from "./Layer.js";

/**
 * When instantiated, creates a parallax background effect based on the image id's the users inputs
 * @constructor
 * @param {Game} game - The instance of the game
 * @param {Array<string>} layerIDs - An array of strings, that are the id's of the background images (They will be drawn in order)
 * @param {Array<number>} movementSpeeds - An array of numbers, that are the movement speeds of the background images  (Should follow the same order as the layerIDs)
 * @param {number} width - The width of the background sprite
 * @param {number} height - The height of the background sprite
 * @param {number} x - The horizontal starting position of the layer
 * @param {number} y - The vertical starting position of the layer
 * @param {string} moveDirection - The moving direction of the layers, value can be 'left' or 'right' 
 */

class ParallaxBackground {
    constructor(game, layerIDs, movementSpeeds, width, height, x, y, moveDirection) {
        this.game = game;
        this.layerIDs = layerIDs;
        this.movementSpeeds = movementSpeeds;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.moveDirection = moveDirection;
        this.layers = [];
        for (let i=0; i < layerIDs.length; ++i) {
            let image = document.getElementById(layerIDs[i]);
            this.layers.push(new Layer(this.game, image, this.movementSpeeds[i], this.width, this.height, this.x, this.y, this.moveDirection));
        }
    }
    update() {
        this.layers.forEach(layer => layer.update());
    }
    draw(context) {
        this.layers.forEach(layer => layer.draw(context));
    }
}

export { ParallaxBackground };