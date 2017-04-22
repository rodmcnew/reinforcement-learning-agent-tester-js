import {matrixToVector} from '../tensorTools'
import {rl} from  './helper/rl'
import {config as environmentConfig} from '../environment'

const actions = [
    'w',
    'a',
    's',
    'd'
];


const numberOfStates = environmentConfig.viewPortSize[0] * environmentConfig.viewPortSize[1];
// create an environment object
var env = {};
env.getNumStates = function () {
    return numberOfStates;
};
env.getMaxNumActions = function () {
    return 4;
};

// create the DQN agent
var spec = {alpha: 0.01}; // see full options on DQN page
let agent = new rl.DQNAgent(env, spec);

export default class QLearner {
    constructor() {
        this._lastScore = null;
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const state = matrixToVector(observation.costs);

        if (this._lastScore !== null) {
            agent.learn(observation.score - this._lastScore);
        }

        if (Math.random() < .001) {
            if (!document.getElementById('q-learning-data')) {
                let element = document.createElement("TEXTAREA");
                element.setAttribute('id','q-learning-data');
                document.body.appendChild(element);
            }
            document.getElementById('q-learning-data').innerHTML = JSON.stringify(agent.toJSON());
        }

        var actionIndex = agent.act(state);

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        return action;
    }
}
