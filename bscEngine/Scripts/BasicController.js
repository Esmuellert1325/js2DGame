/**
 * When instantiated, allows the player to control the object in multiple ways. 
 * Note: When a key parameter is given null, then the object will not move in the specified direction
 * @constructor
 * @param {Game} game - The instance of the game
 * @param {any} object - The object to which the controller should be applied to
 * @param {number} maxSpeed - The maximum movement speed the object
 * @param {string} upKey - The key that controls the player upwards
 * @param {string} downKey - The key that controls the player downwards
 * @param {string} leftKey - The key that controls the player left
 * @param {string} rightKey - The key that controls the player right
 */

class BasicController {
    constructor(game, object, maxSpeed, upKey, downKey, leftKey, rightKey) {
        this.game = game;
        this.object = object;
        this.keys = [];
        this.maxSpeed = maxSpeed;
        this.speedX = 0;
        this.speedY = 0;
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;

        window.addEventListener('keydown', e => {
            if (((e.key === this.upKey) || (e.key === this.downKey) || (e.key === this.leftKey) || (e.key === this.rightKey)) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (this.keys.indexOf(e.key) > -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
    /**
     * When called, updates the objects position
     * @function
     */
    update() {
        if (this.keys.length == 1) {
            if (this.keys.includes(this.upKey) && this.object.y >= 0) {
                this.speedY = -this.maxSpeed;
            }
            else if (this.keys.includes(this.downKey) && this.object.y <= this.game.height - this.object.height) {
                this.speedY = this.maxSpeed;
            }
            else if (this.keys.includes(this.leftKey) && this.object.x >= 0) {
                this.speedX = -this.maxSpeed;
            }
            else if (this.keys.includes(this.rightKey) && this.object.x <= this.game.width - this.object.width) {
                this.speedX = this.maxSpeed;
            }
            this.object.y += this.speedY;
            this.object.x += this.speedX;
            this.speedY = 0;
            this.speedX = 0;
        }
    }
}

export { BasicController };