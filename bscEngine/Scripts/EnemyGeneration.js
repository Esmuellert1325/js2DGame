/**
 * When instantiated allows to use its methods to generate enemies on the canvas
 * @constructor
 * @param {Game} game - The instance of the game
 * @param {number} width - The width of the enemies 
 * @param {number} height - The height of the enemies 
 * @param {string} moveDirection - The direction the enemies should be moving toward, value can either be 'left' or 'right' 
 */

class EnemyGenerator {
    constructor(game, width, height, moveDirection) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.moveDirection = moveDirection;
        this.enemies = [];
    }
    /**
     * When called it creates an enemy
     * @function
     * @param {number} x - The horizontal position where the enemy should be created 
     * @param {number} y - The vertical position where the enemy should be created 
     * @param {number} speedX - The horizontal speed of the enemies
     * @param {number} lives - The number of lives of the enemies
     */
    addEnemy(x, y, speedX, lives) {
        this.enemies.push(new Enemy(this.game, x, y, this.width, this.height, this.moveDirection, speedX, lives));
    }
    /**
     * When called in the games draw method, it draws enemies on the canvas
     * @function
     * @param {CanvasRenderingContext2D} context - The 2D context of the canvas
     */
    drawEnemies(context) {
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        })
    }
}

class Enemy {
    constructor(game, x, y, width, height, moveDirection, speedX, lives) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveDirection = moveDirection;
        this.speedX = speedX;
        this.lives = lives;
        this.markedForDeletion = false;
    }
    /**
     *  When called, it updates enemy objects on canvas
     * @function
     */
    update() {
        if (this.moveDirection === 'left') {
            this.x += this.speedX;
            if (this.x + this.game.width < 0) this.markedForDeletion = true;
        }
        if (this.moveDirection === 'right') {
            this.x += this.speedX;
            if (this.x > this.game.width - 300) this.markedForDeletion = true;
        }
    }
    /**
     *  When called, it draws enemy objects on canvas
     * @function
     */
    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { EnemyGenerator };