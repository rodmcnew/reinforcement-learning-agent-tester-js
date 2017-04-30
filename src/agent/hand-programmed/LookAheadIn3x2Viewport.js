import {getActionViaFeelers} from './helper/feeler'

const feelerPaths = [
    ['s'],
    ['a', 's'],
    ['d', 's'],
];

export default class LookAheadIn3x2Viewport {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return getActionViaFeelers(observation, feelerPaths, null);
    }
}
