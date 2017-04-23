import {matrixToVector} from '../tensorTools'
import {config as environmentConfig} from '../environment'
import {data as savedNeuralNetwork} from './neural-network-saves/view-port-5-5-0-1/games-1000'
import RlDqn from './helper/RlDqn'
import {convert9x9to5x5} from './helper/viewportConversions'
const actions = ['w', 'a', 's', 'd'];

// const numberOfStates = environmentConfig.viewPortSize[0] * environmentConfig.viewPortSize[1];
const numberOfStates = 5 * 5 + 1;

let rlDqn = new RlDqn(true, numberOfStates, savedNeuralNetwork);

export default class RL_DQN_5X5 {
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
        if (observation.tileTypes.length !== 9 || observation.tileTypes[0].length !== 9) {
            throw new Error('Incompatible viewport size');
        }

        const state = matrixToVector(convert9x9to5x5(observation.tileTypes));

        //Give the agent memory of the last action it took. This may be cheating.
        state.push(this._lastActionIndex);

        let reward = null;
        if (this._lastScore !== null) {
            reward = observation.score - this._lastScore;
        }

        const actionIndex = rlDqn.getAction(state, reward);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        this._lastActionIndex = actionIndex;
        return action;
    }
}