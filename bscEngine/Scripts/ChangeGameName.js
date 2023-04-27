/**
 * Allows to change the name of the game
 * @constructor
 * @param {string} name - The new name of the game
*/

class ChangeGameName {
    constructor(name) {
        document.title = name;
    }
}

export { ChangeGameName };