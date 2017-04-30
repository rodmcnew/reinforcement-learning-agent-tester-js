import {getActionViaFeelers} from './helper/feeler'
// import {config} from '../../environment'

const feelerPaths = [];
var lookToSideCount = 4;//Math.floor(config.viewPortSize[0] / 2);
var leftPrepend = [];
var rightPrepend = [];
var append = ['s', 's'];
feelerPaths.push(append);
for (let sideWaysAmount = 1; sideWaysAmount <= lookToSideCount; sideWaysAmount++) {
    leftPrepend.push('a');
    rightPrepend.push('d');
    feelerPaths.push([...leftPrepend, ...append]);
    feelerPaths.push([...rightPrepend, ...append]);
}
export default class LookAheadIn9x3Viewport {
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
