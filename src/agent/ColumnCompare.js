import {getActionViaFeelers} from './helper/feeler'

const feelerPaths = [
    ['s','s','s','s','s'],
    ['a', 's','s','s','s','s'],
    ['a', 'a', 's','s','s','s','s'],
    ['a', 'a', 'a', 's','s','s','s','s'],
    ['a', 'a', 'a', 'a', 's','s','s','s','s'],
    ['d', 's','s','s','s','s'],
    ['d', 'd', 's','s','s','s','s'],
    ['d', 'd', 'd', 's','s','s','s','s'],
    ['d', 'd', 'd', 'd', 's','s','s','s','s'],
];

export default class ColumnCompare {
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
