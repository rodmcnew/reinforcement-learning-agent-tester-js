import {matrixToFlatArray} from '../../environment/nestedFloatMatrixMath'
// import {data as savedNeuralNetwork} from '../../data/saves/matrix-deep-q-9x9'
// import * as viewportConversions from '../../environment/viewportConversions'
import Agent from '../../modules/matrix-deep-q-network/Agent'
import {settings} from '../../App' //@TODO use DI instead for this
import {renderActionResponse, renderReward} from './helper/qStateRenderer'
import {actions, config} from '../../environment'

const numberOfStates = config.viewPortSize[0] * config.viewPortSize[1];

let agent = new Agent(numberOfStates, actions.length);
let agentHasBeenInitialized = false;

// agent.loadFromJson(savedNeuralNetwork);

export default class MatrixDeepQNetwork {
    constructor() {
        this._lastScore = null;
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        // const state = matrixToFlatArray(viewportConversions.convert9x9to5x3(observation.tileTypes));
        const state = matrixToFlatArray(observation.tileTypes);

        let reward = null;
        if (this._lastScore !== null && agentHasBeenInitialized) {
            reward = observation.score - this._lastScore;
        }

        let actionIndex = agent.learnAndAct(reward, state);
        let actionResponse = agent.getLastActionStats();

        if (settings.renderingEnabled) {
            renderActionResponse(actionResponse);
            if (reward !== null) {
                renderReward(reward)
            }
        }

        let action = actions[actionIndex];

        this._lastScore = observation.score;
        agentHasBeenInitialized = true;
        return action;
    }

    clearBrain() {
        agent = new Agent(numberOfStates, actions.length);
        agentHasBeenInitialized = false;
    }

    exportBrain() {
        return agent.saveToJson();
    }
}
