/**
 * When instanciated creates a plain object.
 * Class can be extended, to be expanded with new properties and methods 
 * @constructor
 * @param {number} x - The horizontal coordinate of the object
 * @param {number} y - The vertical coordinate of the object
 * @param {number} width - The width of the object
 * @param {number} height - The height of the object
 * @param {boolean} visible - The visibility of the object (Can be true or false)
 */

class GeneralObject {
    constructor(x, y, width, height, visible) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = visible;
    }
    /**
     * When called, draws the object
     * @function
     * @param {CanvasRenderingContext2D} context - The 2D Context of the canvas 
     */
    draw(context) {
        if (this.visible) context.fillStyle = 'black';
        else context.fillStyle = 'rgba(255, 255, 255, 0.0)';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { GeneralObject };