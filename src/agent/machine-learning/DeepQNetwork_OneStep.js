import {matrixToVector} from '../../tensorTools'
import RlDqn from './helper/deepQNetworkAdaptor'
// import {config} from '../../environment'
import {data as savedNeuralNetwork} from '../../data/saves/deep-q-5x3'
const actions = ['w', 'a', 's', 'd'];
import * as viewportConversions from '../../renderer/viewportConversions'

const numberOfStates = 5 * 3;//config.viewPortSize[0] * config.viewPortSize[1];

let rlDqn = new RlDqn(true, numberOfStates, savedNeuralNetwork);
let rlDqnHasBeenInitialized = false;

export default class DeepQNetwork_OneStep {
    constructor() {
        this._lastScore = null;
        this._lastActionIndex = 2; //2='s'
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const state = matrixToVector(viewportConversions.convert9x9to5x3(observation.tileTypes));

        //Give the agent memory of the last action it took. This may be cheating.
        // state.push(this._lastActionIndex);

        let reward = null;
        if (this._lastScore !== null && rlDqnHasBeenInitialized) {
            reward = observation.score - this._lastScore;
        }

        const actionIndex = rlDqn.getAction(state, reward);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        this._lastActionIndex = actionIndex;
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
