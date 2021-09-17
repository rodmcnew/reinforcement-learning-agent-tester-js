/**
 * Data model that holds what the agent gets to see about the environment
 */
export default class AgentObservation {
    /**
     *
     * @param {Array} tileTypes
     * @param {int} score
    //  * @param {Array} position
     */
    constructor(tileTypes, lastReward/*, position*/) {
        /**
         * @type {Array}
         */
        this.tileTypes = tileTypes;

        /**
         * @type {Number}
         */
        this.lastReward = lastReward;

        // /**
        //  *
        //  * @type {Array} A vector contained the X and Y of the current agent position
        //  */
        // this.position = position;
    }
}
