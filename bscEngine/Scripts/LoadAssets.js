/**
 * When instantiated loads the assets from bscEngine/Assets folder
 * @constructor
 * @param {JSON} assetIdName - A JSON file which contains keys (ID's of assets) and values (file-names of assets) 
 * @param {string} photoFormat - The file format of the assets (png, jpeg, jpg)
 */

class LoadAssets {
    constructor(assetIdName, photoFormat) {
        for (let key in assetIdName) {
            if (assetIdName.hasOwnProperty(key)) {
                let img = document.createElement('img');
                img.id = key;
                img.src = `bscEngine/Assets/${assetIdName[key]}.${photoFormat}`;
                const body = document.querySelector('body');
                body.appendChild(img);
            }
        }
    }
}

export { LoadAssets };