/**
 * When instantiated gives the ability for an instance of a player to shoot projectiles
 * @constructor
 * @param {Game} game - The instance of the game
 * @param {SideScrollerPlayer} player - The instance of the player
 * @param {number} width - The width of the projectiles
 * @param {number} height - The height of the projectiles
 * @param {number} speed - The shooting speed of the projectiles
 * @param {number} xShootPosition - The X coordinates from where the projectiles will be shot
 * @param {number} yShootPosition - The Y coordinates from where the projectiles will be shot
 * @param {string} moveDirection - The direction where the rockets should be moving towards, value can either be 'right' or 'left' 
 */

class SideScrollerShooter {
    constructor(game, player, width, height, speed, xShootPosition, yShootPosition, moveDirection) {
        this.game = game;
        this.player = player;
        this.player.projectiles = []; // Creation of an array, to store projectiles in
        this.player.ammo = 50; // Creation of an array, to store ammo in
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.xShootPosition = xShootPosition;
        this.yShootPosition = yShootPosition;
        this.moveDirection = moveDirection;
    }
    shoot() {
        if (this.player.ammo > 0) {
            this.player.projectiles.push(new Projectile(this.game, this.player.x + this.xShootPosition, this.player.y + this.yShootPosition, this.width, this.height, this.speed, this.moveDirection));
            this.player.ammo--;
        }
    }
}

class Projectile {
    constructor(game, x, y, width, height, speed, moveDirection) {
        this.game = game;
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.markedForDeletion = false;
        this.moveDirection = moveDirection;
    }
    update() {
        if (this.moveDirection === 'right') {
            if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
            this.x += this.speed;
        }
        else if (this.moveDirection === 'left') {
            if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
            this.x -= this.speed;
        }
    }
    draw(context) {
        context.fillStyle = 'yellow';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { SideScrollerShooter };