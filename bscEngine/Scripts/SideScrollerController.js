/**
 * When instantiated, creates a basic player controller for side-scroller games (UP and DOWN movement)
 * @constructor
 * @param {Game} game - The instance of the game
 * @param {SideScrollerPlayer} player - The instance of the player
 * @param {string} upButton - Controls the player upward 
 * @param {string} downButton - Controls the player downward 
 * @param {string} actionButton - Performs a player action, like shooting
 * @param {number} speedY - The vertical speed of the player
 * @param {number} maxSpeed - The maximum speed of the player
 */

class SideScrollerController {
    constructor(game, player, upButton, downButton, actionButton, speedY, maxSpeed) {
        this.game = game;
        this.player = player;
        this.player.keys = [];
        this.player.speedY = speedY;
        this.player.maxSpeed = maxSpeed;
        this.upButton = upButton;
        this.downButton = downButton;
        this.actionButton = actionButton;

        window.addEventListener('keydown', e => {
            if (((e.key === this.upButton) || (e.key === this.downButton)) && this.player.keys.indexOf(e.key) === -1) {
                this.player.keys.push(e.key);
            }
            else if ((e.key === this.actionButton) && this.player.shooter != null) {
                this.player.shooter.shoot();
            }
        });
        window.addEventListener('keyup', e => {
            if (this.player.keys.indexOf(e.key) > -1) {
                this.player.keys.splice(this.player.keys.indexOf(e.key), 1);
            }
        });
    }
}

export { SideScrollerController };