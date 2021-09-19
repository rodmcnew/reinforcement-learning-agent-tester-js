import * as viewportConversions from '../environment/viewportConversions'
import { matrixToFlatArray } from '../environment/nestedFloatMatrixMath'
// import { data as savedBrain } from '../../data/saves/tabular-sarsa'
import { Agent } from 'tabular-sarsa'
import { renderActionResponse, renderReward } from '../lib-agent-helper/qStateRenderer'
import { settings } from '../../App'
import { actions } from '../environment'

/**
 * This controls whether we make the agent aware of what it's last action was. Setting this to true causes the agent
 * to get stuck in "back and forth" loops much less often but it also unfortunately makes it impossible to load saved
 * brain data in Chrome because chrome returns "call stack size exceeded" when parsing the large saved JSON.
 * @type {boolean}
 */
const rememberLastAction = true;

const viewportPixelCount = 5 * 3;
export const stateCount = Math.pow(2, viewportPixelCount) * (rememberLastAction ? actions.length : 1);

var agent = new Agent(stateCount, actions.length);

// agent.loadFromJson(savedBrain);//Load the previously saved brain
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
            //Trim down the viewport to reduce the combinatorial explosion
            viewportConversions.convert9x9to5x3(
                observation
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
        this._lastAction = 0;
        // rewardCalculator = new RewardCalculator();
    }

    static getName() {
        return 'Reinforcement Learning - Tabular SARSA - 5x3 Viewport - Not Pre-trained';
    }

    static getDescription() {
        return 'This agent uses the Expected-SARSA algorithm with a table-based Q function.'
            + ' The table stores the expected reward for ' + stateCount + ' possible states.'
            + ' This agent views a 5x3 section of the viewport. '
            + (rememberLastAction ? ' It also remembers the last action it took to help avoid loops.' : '');
    }

    /**
     * @param {AgentObservation} observation
     * @TODO clear last actions when is new game
     * @return {string} action code
     */
    getAction(lastAction, lastReward, observationMatrix) {
        // let reward = rewardCalculator.calcLastReward(observation);
        var state = observationToInt(observationMatrix, this._lastAction);
        var actionIndex = agent.decide(lastReward, state);
        var lastActionStats = agent.getLastActionStats();
        if (settings.renderingEnabled) {
            renderActionResponse(
                {
                    weights: lastActionStats.weights,
                    wasRandom: lastActionStats.wasRandomlyChosen
                }
            );
            renderReward(lastReward);
        }
        this._lastAction = actionIndex;
        return actionIndex;
    }

    newGame() { }

    clearBrain() {
        agent = new Agent(stateCount, actions.length);
    }

    exportBrain() {
        return agent.saveToJson();
    }
}
