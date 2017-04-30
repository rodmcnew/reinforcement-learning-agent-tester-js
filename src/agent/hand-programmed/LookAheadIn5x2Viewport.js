import {getActionViaFeelers} from './helper/feeler'

const feelerPaths = [
    ['s'],
    ['a', 's'],
    ['a', 'a', 's'],
    ['d', 's'],
    ['d', 'd', 's']
];

export default class LookAheadIn5x2Viewport {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return getActionViaFeelers(observation, feelerPaths, null);
    }
}
