import State from './State'
import {config} from './index'

/**
 * Returns a random initial starting state
 *
 * @returns {State}
 */
export const generateInitialState = () => {
    return new State(
        generateRandomCosts(config.size),
        [Math.floor(config.size[0] / 2), 0],
        0,
        false
    );
};

/**
 * Generates a random set of costs for generated random environment states
 *
 * @param {Array} size
 * @returns {Array}
 */
function generateRandomCosts(size) {
    const costs = [];
    const min = 1;
    const max = 9;
    for (let xi = 0; xi < size[0]; xi++) {
        costs[xi] = [];
        for (let yi = 0; yi < size[1]; yi++) {
            let cost = Math.floor(Math.random() * (max - min + 1)) + min;

            if (cost < 7) {
                cost = 0;
            } else {
                cost = 9;
            }

            costs[xi][yi] = cost;
        }
    }
    return costs;
}
