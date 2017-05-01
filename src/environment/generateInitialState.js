import State from './State'
import {config} from './index'

/**
 * Returns a random initial starting state
 *
 * @returns {State}
 */
export const generateInitialState = () => {
    return new State(
        generateRandomTileTypes(config.size),
        [Math.floor(config.size[0] / 2), 0],
        0,
        false
    );
};

/**
 * Generates a random set of tileTypes for generated random environment states
 *
 * @param {Array} size
 * @returns {Array}
 */
function generateRandomTileTypes(size) {
    const tileTypes = [];
    var xLen = size[0];
    var yLen = size[1];
    for (var xi = 0; xi < xLen; xi++) {
        tileTypes[xi] = new Array(yLen);
        for (var yi = 0; yi < size[1]; yi++) {
            // tileTypes[xi][yi] = Math.random() < 0.7 ? 0 : 1;
            tileTypes[xi][yi] = Math.random() < 0.2 ? 1 : 0;
        }
    }
    return tileTypes;
}
