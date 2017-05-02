import {getActionViaFeelers} from './helper/feeler'

const feelerPaths = [
    ['a', 'a', 's', 's'],
    ['a', 's', 'a', 's'],
    ['a', 's', 's'],
    ['s', 'a', 's'],
    
    ['s', 's'],

    ['d', 'd', 's', 's'],
    ['d', 's', 'd', 's'],
    ['d', 's', 's'],
    ['s', 'd', 's'],
];

export default class LookAheadIn5x3Viewport {
    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        return getActionViaFeelers(observation, feelerPaths, null);
    }
}
