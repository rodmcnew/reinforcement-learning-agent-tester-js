import {getActionViaFeelers} from './helper/feeler'

const feelerPaths = [
    ['s'],
    ['a', 's'],
    ['a', 'a', 's'],
    ['a', 'a', 'a', 's'],
    ['a', 'a', 'a', 'a', 's'],
    ['d', 's'],
    ['d', 'd', 's'],
    ['d', 'd', 'd', 's'],
    ['d', 'd', 'd', 'd', 's'],
];

export default class LookAheadWideAndShallow {
    /**
     * An agent that looks far to the sides but one tile downward
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return getActionViaFeelers(observation, feelerPaths, null);
    }
}
