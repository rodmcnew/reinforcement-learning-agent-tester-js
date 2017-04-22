/**
 * An agent that just always moves downwards no matter what
 *
 * @constructor
 */
export default class AlwaysDown {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return 's';
    }
}
