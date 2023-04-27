/**
 * When instantiated creates a layer of an image
 * @constructor
 * @param {Game} game - The instance of the game
 * @param {HTMLImageElement} image - A HTML img tag 
 * @param {number} speedModifier - A number that modifies the layer's movement speed 
 * @param {number} width - The width of the background sprite
 * @param {number} height - The height of the background sprite
 * @param {number} x - The horizontal starting position of the layer
 * @param {number} y - The vertical starting position of the layer
 * @param {string} moveDirection - The moving direction of the layers, value can be 'left' or 'right' 
 */

class Layer {
    constructor(game, image, speedModifier, width, height, x, y, moveDirection) {
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.moveDirection = moveDirection;
    }
    update() {
        if (this.moveDirection === 'left') {
            if (this.x <= -this.width) this.x = 0;
            this.x -= this.speedModifier;
        }
        else if (this.moveDirection === 'right') {
            if (this.x >= 0) this.x = this.game.width - this.width;
            this.x += this.speedModifier;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y);
        context.drawImage(this.image, this.x + this.width, this.y);
    }
}

export { Layer };