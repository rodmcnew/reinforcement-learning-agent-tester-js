import * as viewportConversions from '../../environment/viewportConversions'
import {matrixToFlatArray} from '../../environment/nestedFloatMatrixMath'
import {data as savedBrain} from '../../data/saves/tabular-sarsa-5x3'
import {Agent} from 'tabular-sarsa'
import {renderActionResponse,renderReward} from './helper/deepQNetworkAdaptor'
import {settings} from '../../App'

const actions = ['w', 'a', 's', 'd'];

/**
 * Takes an array of 0s and 1s and converts them to an int
 *
 * @param vector
 * @returns {number}
 */
export function arrayOfBinariesToInt(vector) {
    var output = 0;
    for (var i = 0, len = vector.length; i < len; i++) {
        output += vector[i] * Math.pow(2, i);
    }
    return output;
}

const actionCount = 4;
// const stateCount = Math.pow(2, 5 * 4);
const stateCount = Math.pow(2, 5 * 3);
var tabularQLearner = new Agent(stateCount, actionCount);
tabularQLearner.loadFromJson(savedBrain);//Load previously saved brain
var tabularQLearnerHasBeenInititalized = false;
export default class Agent_5x3Viewport_Adaptor {
    constructor() {
        this._lastScore = null;
    }

    _observationToKey(observation) {
        return arrayOfBinariesToInt(matrixToFlatArray(
            // viewportConversions.convert9x9to7x5(//Trim down the viewport to reduce the combinatorial explosion
            viewportConversions.convert9x9to5x3(//Trim down the viewport to reduce the combinatorial explosion
                observation.tileTypes
            )
        ));
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let reward = null;

        if (this._lastScore !== null && tabularQLearnerHasBeenInititalized) {
            reward = observation.score - this._lastScore;
        }
        this._lastScore = observation.score;
        const observationKey = this._observationToKey(observation);
        tabularQLearnerHasBeenInititalized = true;
        var action = actions[tabularQLearner.decide(reward, observationKey)];
        var lastActionStat = tabularQLearner.getLastActionStats();
        if(settings.renderingEnabled){
            renderActionResponse({weights:lastActionStat.weights, wasRandom:lastActionStat.wasRandomlyChosen});
            renderReward(reward);
        }
        return action;
    }

    newGame() {

    }

    clearBrain() {
        tabularQLearner = new Agent(stateCount, actionCount);
        tabularQLearnerHasBeenInititalized = false;
    }

    exportBrain() {
        return tabularQLearner.saveToJson();
    }
}


// var adjustmentValueElement;
// function renderAdjustmentValue(value) {
//     if (!adjustmentValueElement) {
//         adjustmentValueElement = document.createElement('DIV');
//         adjustmentValueElement.id = 'adjustmentValue';
//         document.getElementById('agentRendererContainer').appendChild(adjustmentValueElement);
//     }
//     adjustmentValueElement.innerHTML = 'Q adjustment value: ' + value;
// }
//
// var observationKeyElement;
// function renderObservationKey(key) {
//     if (!observationKeyElement) {
//         observationKeyElement = document.createElement('DIV');
//         observationKeyElement.id = 'observationKey';
//         document.getElementById('agentRendererContainer').appendChild(observationKeyElement);
//     }
//     observationKeyElement.innerHTML = 'Q table key: ' + key;
// }
//
// var qTableSizeElement;
// function renderQTableSize(size) {
//     if (!qTableSizeElement) {
//         qTableSizeElement = document.createElement('DIV');
//         qTableSizeElement.id = 'qTableSize';
//         document.getElementById('agentRendererContainer').appendChild(qTableSizeElement);
//     }
//     qTableSizeElement.innerHTML = 'Unique observations seen: ' + size;
// }
