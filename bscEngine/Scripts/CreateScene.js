/**
 * @constructor Creates one instance only of a canvas element 
 */
class CreateScene {
    // A singleton design-pattern is used, so we can only have one canvas (instance) at a given time
    constructor() {
        if (CreateScene.instance == null) {
            let body = document.querySelector('body');
            let canvas = document.createElement('canvas');
            canvas.id = 'canvas1';
            body.appendChild(canvas);
            CreateScene.instance = this;
        }
        return CreateScene.instance;
    }
}

/**
 * Creates a new canvas element in index.html file, with the ID "canvas1"
 * @constructor
*/
const createScene = new CreateScene();
Object.freeze(createScene);

export { createScene };