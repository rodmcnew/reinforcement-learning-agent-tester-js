import {matrixToFlatArray} from '../../environment/nestedFloatMatrixMath'
import {data as savedNeuralNetwork} from '../../data/saves/deep-q-network-9x9'
// import * as viewportConversions from '../../environment/viewportConversions'
import Agent from '../../modules/deep-q-network/Agent'
import {settings} from '../../App' //@TODO use DI instead for this
import {renderActionResponse, renderReward} from './helper/qStateRenderer'
import {actions, config} from '../../environment'
import RewardCalculator from './helper/RewardCalculator'

// const numberOfStates = 5*3;
const numberOfStates = config.viewPortSize[0] * config.viewPortSize[1];

let agent = new Agent(numberOfStates, actions.length);
let rewardCalculator = new RewardCalculator();

agent.loadFromJson(savedNeuralNetwork);

export default class MatrixDeepQNetwork {
    constructor() {
        rewardCalculator = new RewardCalculator();
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

        // console.log(lastReward,state);
        let actionIndex = agent.learnAndAct(lastReward, state);
        let actionResponse = agent.getLastActionStats();
// console.log(actionResponse);

        if (settings.renderingEnabled) {
            renderActionResponse(actionResponse);
            if (lastReward !== null) {
                renderReward(lastReward)
            }
        }

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        return action;
    }

    clearBrain() {
        agent = new Agent(numberOfStates, actions.length);
        rewardCalculator = new RewardCalculator();
    }

    exportBrain() {
        return agent.saveToJson();
    }
}
