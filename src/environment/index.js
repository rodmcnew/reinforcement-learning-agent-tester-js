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
     */
    constructor(size, costs, position, score) {
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
    state = Object.assign({},state);//State is immutable so make clone
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
        state.position,
        state.score
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

            //Leave more empty space to make the game more interesting
            if (cost < 6) {
                cost = 0;
            }

            costs[xi][yi] = cost;
        }
    }
    return costs;
}
