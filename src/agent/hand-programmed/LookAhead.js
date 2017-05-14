import {getActionViaFeelers} from './helper/feeler'
// import {config} from '../../environment'

const feelerPaths = [];
var lookToSideCount = 4;//Math.floor(config.viewPortSize[0] / 2);
var leftPrepend = [];
var rightPrepend = [];
var appends = [
    ['s', 's'],
    
    ['s', 'a', 's'],
    ['s', 'a', 'a', 's'],
    ['s', 'a', 'a', 'a', 's'],
    ['s', 'a', 'a', 'a', 'a', 's'],
    ['s', 'a', 'a', 'a', 'a', 'a', 's'],
    ['s', 'a', 'a', 'a', 'a', 'a', 'a', 's'],

    ['s', 'd', 's'],
    ['s', 'd', 'd', 's'],
    ['s', 'd', 'd', 'd', 's'],
    ['s', 'd', 'd', 'd', 'd', 's'],
    ['s', 'd', 'd', 'd', 'd', 'd', 's'],
    ['s', 'd', 'd', 'd', 'd', 'd', 'd', 's'],
];
feelerPaths.push(['s', 's']);
for (let sideWaysAmount = 1; sideWaysAmount <= lookToSideCount; sideWaysAmount++) {
    leftPrepend.push('a');
    rightPrepend.push('d');

    appends.forEach((append)=> {
        feelerPaths.push([...leftPrepend, ...append]);
        feelerPaths.push([...rightPrepend, ...append]);
    });

}
export default class LookAhead {
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
