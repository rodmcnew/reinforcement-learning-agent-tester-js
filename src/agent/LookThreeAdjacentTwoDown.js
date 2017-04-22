import {getActionViaFeelers} from './helper/feeler'

const feelerPaths = [
    ['s', 's'],

    ['a', 's', 's'],
    ['s', 'a', 's'],
    ['a', 'a', 's', 's'],
    ['s', 'a', 'a', 's'],
    ['s', 'a', 'a', 'a', 's'],
    ['a', 's', 'a', 'a', 's'],
    ['a', 'a', 's', 'a', 's'],
    ['a', 'a', 'a', 's', 's'],

    ['d', 's', 's'],
    ['s', 'd', 's'],
    ['d', 'd', 's', 's'],
    ['s', 'd', 'd', 's'],
    ['s', 'd', 'd', 'd', 's'],
    ['d', 's', 'd', 'd', 's'],
    ['d', 'd', 's', 'd', 's'],
    ['d', 'd', 'd', 's', 's'],
];

export default class LookThreeAdjacentTwoDown {
    constructor() {
        this._state = {lastAction: null};
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let action = getActionViaFeelers(observation, feelerPaths, this._state.lastAction);

        this._state.lastAction = action;

        return action;
    }
}
