/**
 * A class when istantiated allows the user to call various methods, to implement physics in their game
 * @constructor
 * @param {Game} game - The instance of the game
 */

class Physics {
    constructor(game) {
        this.game = game;
    }
    /**
     * A method that compares two canvas rectangles and checks if they collided
     * @function
     * If there is a collision it returns a true boolean value
     * @param {any} rect1 
     * @param {any} rect2 
     */
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y
        )
    }
}

export { Physics };