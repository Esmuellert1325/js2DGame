class Sprite {
    constructor(id, object) {
        this.id = id;
        this.object = object;
    }
}

/**
 * When instantiated, allows user to add a static sprite on an object
 * @constructor
 * @param {string} id - The ID of the choosen sprite image
 * @param {any} object - The instance of the object
 */
class StaticSprite extends Sprite {
    constructor(id, object) {
        super(id, object);
        this.image = document.getElementById(id);
    }
    draw(context) {
        context.drawImage(this.image, this.object.x, this.object.y, this.object.width, this.object.height);
    }
}

/**
 * When instantiated, allows user to add an animated sprite on an object
 * @constructor
 * @param {string} id - The ID of the choosen sprite image
 * @param {any} object - The instance of the object
 * @param {number} maxFrame - The maximum amount of frames in the spritesheet
 */
class AnimatedSprite extends Sprite {
    constructor(id, object, frameX, frameY, maxFrame) {
        super(id, object);
        this.image = document.getElementById(id);
        this.frameX = frameX;
        this.frameY = frameY;
        this.maxFrame = maxFrame;
    }
    draw(context) {
        context.drawImage(this.image, this.object.width * this.frameX, this.object.height * this.frameY, this.object.width, this.object.height, this.object.x, this.object.y, this.object.width, this.object.height);
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        }
        else {
            this.frameX = 0;
        }
    }
}

export { StaticSprite, AnimatedSprite };