import lookAhead from './helper/lookAhead'

const actionPathsToCheck = [
    {path: ['s']},
    {path: ['a', 's']},
    {path: ['a', 'a', 's']},
    {path: ['a', 'a', 'a', 's']},
    {path: ['a', 'a', 'a', 'a', 's']},
    {path: ['a', 'a', 'a', 'a', 'a', 's']},
    {path: ['a', 'a', 'a', 'a', 'a', 'a', 's']},
    {path: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 's']},
    {path: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 's']},
    {path: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 's']},
    {path: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 's']},
    {path: ['d', 's']},
    {path: ['d', 'd', 's']},
    {path: ['d', 'd', 'd', 's']},
    {path: ['d', 'd', 'd', 'd', 's']},
    {path: ['d', 'd', 'd', 'd', 'd', 's']},
    {path: ['d', 'd', 'd', 'd', 'd', 'd', 's']},
    {path: ['d', 'd', 'd', 'd', 'd', 'd', 'd', 's']},
    {path: ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 's']},
    {path: ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 's']},
    {path: ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 's']}
];

/**
 * An agent that looks at 7 lateral moves in each direction and one move downwards for each one.
 *
 * @constructor
 */

export default (observation, agentState)=> {
    return {
        action: lookAhead(observation, actionPathsToCheck),
        state: {}
    };
}