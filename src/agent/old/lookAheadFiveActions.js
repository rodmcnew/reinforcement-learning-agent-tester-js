import lookAhead from './helper/lookAhead'
import generatePaths from './helper/generatePaths'

//Will be used in normal situations
const standardActionPathsToCheck = generatePaths(5);

//Will be used if the agent appears to be stuck in an infinite action loop
const fallBackActionPathsToCheck = [
    {path: ['a', 's']},
    {path: ['s']},
    {path: ['d', 's']}
];

/**
 * Look at the current observation and the previous agent internal state, then come
 * up with an appropriate action and a new internal state.
 *
 * @param {Object} observation What the agent gets to see about the environment
 * @param {Object|null} agentState The agent's previous internal state
 * @returns {{action: *, state: *}}
 */
export default (observation, agentState)=> {
    /**
     * Clone the previous agent state and ensure it has needed default values
     * @type {*}
     */
    agentState = Object.assign(
        {},
        {
            previousPositions: []
        },
        agentState
    );

    const positionAsString = observation.position.x + ',' + observation.position.y;

    let actionPathsToCheck = standardActionPathsToCheck;

    if (agentState.previousPositions.indexOf(positionAsString) !== -1) {
        /**
         * If we have been in the current position before, use the fallback action list to prevent infinite
         * action loops
         */
        actionPathsToCheck = fallBackActionPathsToCheck;
    }

    agentState.previousPositions.push(positionAsString);

    return {
        action: lookAhead(observation, actionPathsToCheck),
        state: agentState
    };
}