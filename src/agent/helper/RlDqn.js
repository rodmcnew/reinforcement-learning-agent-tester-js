import {rl} from './rl'
export default class RlDqn {
    constructor(learningEnabled, numberOfStates, previousSavedData) {
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
        this._agent = new rl.DQNAgent(env, spec);
        if (typeof previousSavedData !== 'undefined') {
            this._agent.fromJSON(previousSavedData);
        }

        this._dumpTimer = 0;
        this._learningEnabled = learningEnabled;
    }

    getAction(state, reward) {
        if (this._learningEnabled) {
            if (reward !== null) {
                this._agent.learn(reward);
            }

            this._dumpTimer++;
            if (this._dumpTimer === 1000) {
                this._dumpTimer = 0;
                if (!document.getElementById('q-learning-data')) {
                    let div = document.createElement('div');
                    let label = document.createElement('div');
                    label.innerHTML = '<br/>Q Learner Internal State Dump';
                    let textArea = document.createElement("TEXTAREA");
                    textArea.style.width = '100%';
                    textArea.style.height = '10em';
                    textArea.setAttribute('id', 'q-learning-data');
                    div.appendChild(label);
                    div.appendChild(textArea);
                    document.body.appendChild(div);
                }
                document.getElementById('q-learning-data').innerHTML = JSON.stringify(this._agent.toJSON());
            }

        }
        return this._agent.act(state);
    }
}