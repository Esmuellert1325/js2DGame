/**
 * Creates a basic player character, with the given values
 * @constructor
 * @param {Game} game - The instance of the game
 * @param {number} width - The width of the player
 * @param {number} height - The height of the player
 * @param {number} x - The starting horizontal position of the player
 * @param {number} y - The starting vertical position of the player
 * @param {number} speedY - The vertical speed of the player
 */

class SideScrollerPlayer {
    constructor(game, width, height, x, y) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    update() {
        if (this.controller != null) {
            if (this.keys.includes(this.controller.upButton) && this.y >= 0) this.speedY = -this.maxSpeed;
            else if (this.keys.includes(this.controller.downButton) && this.y <= this.game.height - this.height) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
        }
        if (this.projectiles != null) {
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }
    }
    draw(context) {
        if (this.sprite != null) {
            this.sprite.draw(context);
        }
        else {
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.projectiles != null) {
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
    }
}

export { SideScrollerPlayer };