// import '../deep-q-network/runTests'
import QNetworkAgent from '../../../modules/deep-q-network/Agent'
import {settings} from '../../../App' //@TODO use DI instead for this
import {renderActionResponse, renderReward} from './qStateRenderer'


export default class RlDqn {
    constructor(learningEnabled, numberOfStates, previousSavedData) {
        var numberOfActions = 4;
        // create the DQN agent
        // this._neuralNetwork = new NeuralNetwork(numberOfStates, numberOfActions, [100]);

        if (typeof previousSavedData !== 'undefined') {
            // this._neuralNetwork.fromJSON(previousSavedData);
        }
        this._agent = new QNetworkAgent(
            numberOfStates,
            numberOfActions,
            this._neuralNetwork,
            {},
        );

        this._learningEnabled = learningEnabled;
    }

    getAction(state, reward) {
        // currentNeuralNetwork = this._neuralNetwork;

        if (!this._learningEnabled) {
            reward = null;//Passing null rewards to the agent disables learning inside it
        }

        if (reward) {
            reward = reward / 100;//Squash the reward to be between -1 and 1
        }

        let action = this._agent.learnAndAct(reward, state);
        let actionResponse = this._agent.getLastActionStats();

        if (settings.renderingEnabled) {
            renderActionResponse(actionResponse);
            if (reward !== null) {
                renderReward(reward)
            }
        }

        return action;
    }

    exportBrain() {
        return this._neuralNetwork.toJSON();
    }
}
