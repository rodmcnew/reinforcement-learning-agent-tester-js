import {matrixToFlatArray} from '../../environment/nestedFloatMatrixMath'
import RlDqn from './helper/deepQNetworkAdaptor'
// import {config} from '../../environment'
import {data as savedNeuralNetwork} from '../../data/saves/deep-q-5x3'
const actions = ['w', 'a', 's', 'd'];
import * as viewportConversions from '../../environment/viewportConversions'

const numberOfStates = 5 * 3;//config.viewPortSize[0] * config.viewPortSize[1];

let rlDqn = new RlDqn(true, numberOfStates, savedNeuralNetwork);
let rlDqnHasBeenInitialized = false;

export default class DeepQNetwork_OneStep {
    constructor() {
        this._lastScore = null;
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const state = matrixToFlatArray(viewportConversions.convert9x9to5x3(observation.tileTypes));

        let reward = null;
        if (this._lastScore !== null && rlDqnHasBeenInitialized) {
            reward = observation.score - this._lastScore;
        }

        const actionIndex = rlDqn.getAction(state, reward);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        rlDqnHasBeenInitialized = true;
        return action;
    }

    clearBrain() {
        rlDqn = new RlDqn(true, numberOfStates);
        rlDqnHasBeenInitialized = false;
    }

    exportBrain(){
        return rlDqn.exportBrain();
    }
}
