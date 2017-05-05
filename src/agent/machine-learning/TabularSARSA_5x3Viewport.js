import * as viewportConversions from '../../environment/viewportConversions'
import {matrixToFlatArray} from '../../environment/nestedFloatMatrixMath'
import {data as savedBrain} from '../../data/saves/tabular-sarsa-5x3'
import {Agent} from 'tabular-sarsa'
import {renderActionResponse, renderReward} from './helper/deepQNetworkAdaptor'
import {settings} from '../../App'
import {actions} from '../../environment'

/**
 * Takes an array of 0s and 1s and converts the whole thing to a single int
 *
 * @param array
 * @returns {number}
 */
export function arrayOfBinariesToInt(array) {
    var output = 0;
    for (var i = 0, len = array.length; i < len; i++) {
        output += array[i] * Math.pow(2, i);
    }
    return output;
}

/**
 * Take an observation object and returns an int that represents the given observation state
 *
 * @param {AgentObservation} observation
 * @returns {number}
 */
function observationToInt(observation) {
    return arrayOfBinariesToInt(
        matrixToFlatArray(
            viewportConversions.convert9x9to5x3(//Trim down the viewport to reduce the combinatorial explosion
                observation.tileTypes
            )
        )
    );
}

const stateCount = Math.pow(2, 5 * 3);//There are 5x3 binary pixels in the viewport

var agent = new Agent(stateCount, actions.length);
var agentHasBeenInitialized = false;

agent.loadFromJson(savedBrain);//Load the previously saved brain

export default class TabularSARSA_5x3Viewport {
    constructor() {
        this._lastScore = null;
    }

    /**
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let reward = null;
        if (this._lastScore !== null && agentHasBeenInitialized) {
            reward = observation.score - this._lastScore;
        }
        this._lastScore = observation.score;
        agentHasBeenInitialized = true;
        var action = actions[agent.decide(reward, observationToInt(observation))];
        var lastActionStat = agent.getLastActionStats();
        if (settings.renderingEnabled) {
            renderActionResponse({weights: lastActionStat.weights, wasRandom: lastActionStat.wasRandomlyChosen});
            renderReward(reward);
        }
        return action;
    }

    clearBrain() {
        agent = new Agent(stateCount, actions.length);
        agentHasBeenInitialized = false;
    }

    exportBrain() {
        return agent.saveToJson();
    }
}
