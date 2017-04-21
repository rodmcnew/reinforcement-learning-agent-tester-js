function createMatrix(size) {
    var matrix = [];

    for (let yi = 0; yi < size; yi++) {
        matrix[yi] = [];
        for (let xi = 0; xi < size; xi++) {
            matrix[yi][xi] = 0;
        }
    }

    return matrix;
}

function getVisibleCosts(state) {
    const visibles = createMatrix(state.size);
    const directions = [
        {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1},
        {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: -1, y: -1},
    ];
    const adjacentDirections = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];

    function hasNoCostAndIsNotWall(x, y) {
        return typeof state.costs[x] !== 'undefined' && typeof state.costs[x][y] !== 'undefined' && state.costs[x][y] === 0;
    }

    directions.forEach((direction)=> {
        let x = state.position.x;
        let y = state.position.y;
        while (hasNoCostAndIsNotWall(x, y)) {
            visibles[x][y] = 1;
            x = x + direction.x;
            y = y + direction.y;
            adjacentDirections.forEach((subDirection)=> { //@TODO this processes the same squares many times
                let xAdj = x + subDirection.x;
                let yAdj = y + subDirection.y;
                if (hasNoCostAndIsNotWall(xAdj, yAdj)) {
                    visibles[xAdj][yAdj] = 1;
                }
            });
        }
    });

    return visibles;
}

/**
 * The main environment class for this game. This is the public interface for the game.
 */
export default class Environment {
    constructor(environmentConfig) {
        this._environmentState = generateInitialState(environmentConfig);
    }

    applyAction(actionCode) {
        this._environmentState = applyAction(this._environmentState, actionCode);
    }

    getObservation() {
        return getObservation(this._environmentState);
    }
}

/**
 * Data model that holds the environment's full internal state
 */
export class State {
    /**
     * @param {Number} size
     * @param {Array} costs
     * @param {{x: Number, y: Number}} position
     * @param {Number} score
     * @param {Boolean} isComplete
     */
    constructor(size, costs, position, score, isComplete) {
        /**
         * @type {Number}
         */
        this.size = size;
        /**
         * @type {Array}
         */
        this.costs = costs;
        /**
         * @type {{x: Number, y: Number}}
         */
        this.position = position;
        /**
         * @type {Number}
         */
        this.score = score;
        /**
         * @type {Boolean}
         */
        this.isComplete = isComplete;
    }
}

/**
 * Data model that holds what the agent gets to see about the environment
 */
export class Observation {
    /**
     * @param {Number} size
     * @param {Array} costs
     * @param {{x: Number, y: Number}} position
     * @param {Number} score
     * @param {Boolean} isComplete
     */
    constructor(size, costs, visibles, position, score, isComplete) {
        /**
         * @type {Number}
         */
        this.size = size;
        /**
         * @type {Array}
         */
        this.costs = costs;
        this.visibles = visibles;
        /**
         * @type {{x: Number, y: Number}}
         */
        this.position = position;
        /**
         * @type {Number}
         */
        this.score = score;
        /**
         * @type {Boolean}
         */
        this.isComplete = isComplete;
    }
}

/**
 * Returns a random initial starting state
 *
 * @param options
 * @returns {State}
 */
export const generateInitialState = (options) => {
    return new State(
        options.size,
        generateRandomCosts(options.size),
        {x: Math.round(options.size / 2), y: 0},
        0,
        false
    );
};

/**
 * Returns a new state where the given action has been applied to the given state
 *
 * @param {State} state
 * @param {String} actionCode
 * @returns {State}
 */
export const applyAction = (state, actionCode) => {
    state = Object.assign({}, state);//State is immutable so make clone
    let downOneRowReward = 4;
    switch (actionCode) {
        case "w":
            if (state.position.y > 0) {
                state.position.y--;
            }
            state.score = state.score - downOneRowReward;
            break;
        case "a":
            if (state.position.x > 0) {
                state.position.x--;
            }
            break;
        case "s":
            if (state.position.y < state.size - 1) {
                state.position.y++;
            }
            state.score = state.score + downOneRowReward;
            break;
        case "d":
            if (state.position.x < state.size - 1) {
                state.position.x++;
            }
            break;
    }

    state.score = state.score - state.costs[state.position.x][state.position.y];

    state.isComplete = state.position.y == state.size - 1 || state.score < -100;

    return state;
};

/**
 * Returns an observation about the given state that is intended for the agent to see
 *
 * @param {State} state
 * @returns {Observation}
 */
export const getObservation = (state) => {
    return new Observation(
        state.size,
        state.costs,
        getVisibleCosts(state),
        state.position,
        state.score,
        state.isComplete
    );
};

/**
 * Generates a random set of costs for generated random environment states
 *
 * @param {Number} size
 * @returns {Array}
 */
function generateRandomCosts(size) {
    const costs = [];
    const min = 1;
    const max = 9;
    for (let xi = 0; xi < size; xi++) {
        costs[xi] = [];
        for (let yi = 0; yi < size; yi++) {
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
