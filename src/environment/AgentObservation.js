/**
 * Data model that holds what the agent gets to see about the environment
 */
export default class AgentObservation {
    /**
     *
    // * @param {Array} visibles
     * @param {Array} costs
     * @param {int} score
     * @param {Array} position
     */
    constructor(/*visibles,*/ costs, score, position) {
        /**
         * @type {Array}
         */
        this.costs = costs;
        // this.visibles = visibles;
        /**
         * @type {Number}
         */
        this.score = score;
        this.position = position;
    }
}
