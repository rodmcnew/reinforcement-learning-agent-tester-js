import lookAhead from './helper/lookAhead'

const actionPathsToCheck = [
    {path: ['a', 's']},
    {path: ['s']},
    {path: ['d', 's']}
];

/**
 * An agent that looks ahead one square below, and to both sides. It then chooses the least costly.
 *
 * @constructor
 */
export default (observation, agentState)=> {
    return {
        action: lookAhead(observation, actionPathsToCheck),
        state: {}
    };
}