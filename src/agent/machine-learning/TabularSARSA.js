import * as viewportConversions from '../../environment/viewportConversions'
import {matrixToFlatArray} from '../../environment/nestedFloatMatrixMath'
import {data as savedBrain} from '../../data/saves/tabular-sarsa'
import {Agent} from 'tabular-sarsa'
import {renderActionResponse, renderReward} from './helper/deepQNetworkAdaptor'
import {settings} from '../../App'
import {actions} from '../../environment'


/**
 * This controls whether we make the agent aware of what it's last action was. Setting this to true causes the agent
 * to get stuck in "back and forth" loops much less often but it also unfortunately makes it impossible to load saved
 * brain data in Chrome because chrome returns "call stack size exceeded" when parsing the large saved JSON.
 * @type {boolean}
 */
const rememberLastAction = false;

const viewportPixelCount = 5 * 3;
export const stateCount = Math.pow(2, viewportPixelCount) * (rememberLastAction ? actions.length : 1);

var agent = new Agent(stateCount, actions.length);
var agentHasBeenInitialized = false;

agent.loadFromJson(savedBrain);//Load the previously saved brain
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
 * @param lastAction
 * @returns {number}
 */
function observationToInt(observation, lastAction) {
    var viewportState = arrayOfBinariesToInt(
        matrixToFlatArray(
            viewportConversions.convert9x9to5x3(//Trim down the viewport to reduce the combinatorial explosion
                observation.tileTypes
            )
        )
    );
    if (rememberLastAction) {
        return viewportState * (lastAction + 1);
    } else {
        return viewportState;
    }
}


export default class TabularSARSA {
    constructor() {
        this._lastScore = null;
        this._lastAction = 0;
    }

    /**
     * @param {AgentObservation} observation
     * @TODO clear last actions when is new game
     * @return {string} action code
     */
    getAction(observation) {
        let reward = null;
        if (this._lastScore !== null && agentHasBeenInitialized) {
            reward = observation.score - this._lastScore;
        }
        this._lastScore = observation.score;
        agentHasBeenInitialized = true;
        var state = observationToInt(observation, this._lastAction);
        var actionIndex = agent.decide(reward, state);
        var action = actions[actionIndex];
        var lastActionStat = agent.getLastActionStats();
        if (settings.renderingEnabled) {
            renderActionResponse({weights: lastActionStat.weights, wasRandom: lastActionStat.wasRandomlyChosen});
            renderReward(reward);
        }
        this._lastAction = actionIndex;
        return action;
    }

    clearBrain() {
        agent = new Agent(stateCount, actions.length);
        agentHasBeenInitialized = false;
    }

    exportBrain() {
        return agent.saveToJson();
    }

    static getName() {
        return 'ReinforcementLearning - TabularSARSA - ranked 224';
    }

    static getDescription() {
        return 'This agent views a 5x3 section of the viewport that can be in ' + stateCount + ' possible states. ' +
            'It uses the Expected-SARSA algorithm with a table-based Q function.';
    }
}
