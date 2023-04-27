/**
 * Creates a UI object, allows use of methods to draw UI
 * @constructor
 * @param {Game} game - The instance of the game 
 * @param {number} fontSize - The font size of the UI text 
 * @param {string} fontFamily - The font family of the UI text 
 * @param {string} color - The font color of the UI text
 */

class UI {
    constructor(game, fontSize, fontFamily, color) {
        this.game = game;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.color = color;
    }
    /**
     * @function
     * @param {CanvasRenderingContext2D} context - The 2D Context of the canvas 
     * @param {number} amount - The amount of objects the user wants to draw 
     * @param {number} x - The horizontal starting draw coordinate of the objects 
     * @param {number} y - The vertical starting draw coordinate of the objects 
     * @param {number} width - The width of the objects 
     * @param {number} height - The height of the objects 
     * @param {number} xSeparator - The horizontal spacing between the objects 
     * @param {number} ySeparator - The vertical spacing between the objects 
     */
    drawMultipleObjects(context, amount, x, y, width, height, xSeparator, ySeparator) {
        context.fillStyle = this.color;
        for (let i=0; i < amount; ++i) {
            context.fillRect(x + xSeparator * i, y + ySeparator, width, height);
        }
    }
    /**
    * When called it allows the user to draw custom text on the canvas
    * @function
    * @param {CanvasRenderingContext2D} context - The 2D Context of the canvas
    * @param {string} text - The text the user wants to display 
    * @param {number} x - The horizontal starting draw coordinate of the objects 
    * @param {number} y - The vertical starting draw coordinate of the objects
    * @param {string} color - The font color of the UI text
    * @param {number} fontSize - The font size of the UI text 
    * @param {string} fontFamily - The font family of the UI text 
    */
    drawText(context, text, x, y, color, fontSize, fontFamily) {
        context.fillStyle = color;
        context.font = fontSize + 'px ' + fontFamily;
        context.fillText(text, x, y);
    }
}

export { UI };