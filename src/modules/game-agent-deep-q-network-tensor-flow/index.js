import { matrixToFlatArray } from '../environment/nestedFloatMatrixMath'
import { data as savedNeuralNetwork } from '../../data/saves/deep-q-network'
// import * as viewportConversions from '../../environment/viewportConversions'
import Agent from './Agent'
import { settings } from '../../App' //@TODO use DI instead for this
import { renderActionResponse, renderReward } from '../lib-agent-helper/qStateRenderer'
import { actions, config } from '../environment'
import RewardCalculator from '../lib-agent-helper/RewardCalculator'

// const inputCount = 5 * 3;
const inputCount = config.viewPortSize[0] * config.viewPortSize[1];

let agent = new Agent(inputCount, actions.length);
let rewardCalculator = new RewardCalculator();

agent.loadFromJson(savedNeuralNetwork);

export default class DeepQNetworkTensorFlow {
    constructor() {
        rewardCalculator = new RewardCalculator();
    }

    static getName() {
        return 'ReinforcementLearning - DeepQNetwork - 9x9 - ranked - 230'
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const lastReward = rewardCalculator.calcLastReward(observation);
        // const state = matrixToFlatArray(viewportConversions.convert9x9to5x3(observation.tileTypes));
        const state = matrixToFlatArray(observation.tileTypes);

        let actionIndex = agent.learnAndAct(lastReward, state);
        let actionResponse = agent.getLastActionStats();

        if (settings.renderingEnabled) {
            renderActionResponse(actionResponse);
            if (lastReward !== null) {
                renderReward(lastReward)
            }
        }

        let action = actions[actionIndex];

        return action;
    }

    clearBrain() {
        agent = new Agent(inputCount, actions.length);
        rewardCalculator = new RewardCalculator();
    }

    exportBrain() {
        return agent.saveToJson();
    }
}
