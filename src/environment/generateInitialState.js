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
    const min = 1;
    const max = 9;
    for (let xi = 0; xi < size[0]; xi++) {
        tileTypes[xi] = [];
        for (let yi = 0; yi < size[1]; yi++) {
            let randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

            let tileType;

            if (randomValue < 7) {
                tileType = 0;
            } else {
                tileType = 1;
            }

            tileTypes[xi][yi] = tileType;
        }
    }
    return tileTypes;
}
