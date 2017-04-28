/**
 * An agent that just always moves downwards no matter what
 *
 * @constructor
 */
export default class AlwaysMoveStraightDown {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return 's';
    }
}
