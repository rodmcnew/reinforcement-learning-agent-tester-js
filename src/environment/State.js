/**
 * Data model that holds the environment's full internal state
 */
export default class State {
    /**
     * @param {Array} costs
     * @param {Array} position [x,y]
     * @param {Number} score
     * @param {Boolean} isComplete
     */
    constructor(costs, position, score, isComplete) {
        /**
         * @type {Array}
         */
        this.costs = costs;
        /**
         * @type {Array} position [x,y]
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
