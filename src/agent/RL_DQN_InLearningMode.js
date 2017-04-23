import {matrixToVector} from '../tensorTools'
import RlDqn from './helper/RlDqn'
import {config} from '../environment'
const actions = ['w', 'a', 's', 'd'];

const numberOfStates = config.viewPortSize[0] * config.viewPortSize[1] + 1;

let rlDqn = new RlDqn(true, numberOfStates);

export default class RL_DQN_InLearningMode {
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
        const state = matrixToVector(observation.tileTypes);

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