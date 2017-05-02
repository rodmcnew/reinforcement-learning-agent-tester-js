import {renderActionResponse, renderReward} from './helper/deepQNetworkAdaptor'
import * as viewportConversions from '../../renderer/viewportConversions'
import {matrixToVector} from '../../tensorTools'
import {settings} from '../../App' //@TODO use DI instead for this
import {data as savedBrain} from '../../data/saves/tabular-q-5x3'

const actions = ['w', 'a', 's', 'd'];

export function getIndexOfMaxValue(array) {
    var maxValue = array[0];
    var maxIndex = 0;
    for (var i = 1, length = 4 /*array.length*/; i < length; i++) {//@TODO unhardcode 4 (fix save to save as array instead of object)
        var v = array[i];
        if (v > maxValue) {
            maxIndex = i;
            maxValue = v;
        }
    }
    return maxIndex;
}

export function getRandomIntWithZeroMin(max) {
    return Math.floor(Math.random() * max);
}

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

export class Tabular_Q_Learner {
    constructor(possibleActionCount) {
        var defaultOptions = {
            discountFactor: 0.75,
            randomActionProbability: 0.05,
            learningRate: 0.5,
            replaysPerAction: 10,
            replayCountToStore: 5000,
            actionsBetweenRecordingNewReplays: 25,
            // tdErrorClamp: 1.0,
        };

        this._replayMemory = [];//@TODO trim this, don't store all
        this._actionsTillNextReplayRecording = 0;

        this._possibleActionCount = possibleActionCount;
        this._options = Object.assign(defaultOptions/*, options*/);

        this._lastScore = null;


        this._q = []; //[];//new Array(Math.pow(2, 5 * 3));//@TODO allow state count as arg for higher performance?

        this.lastStep = {};
    }

    fromJson(json) {
        //Saved brains are currently saving as objects instead of arrays so fix this. //@TODO save properly instead
        json.forEach((val, i) => {
            if (val) {
                this._q[i] = Object.keys(val).map(key => val[key]);//@TODO make Float64Arrays again when loading a save
            }
        });
    }

    toJson() {
        return this._q;
    }

    _learnFromStep(state, action, reward, nextState) {
        // var adjustment = 0;
        var qValues = this._q[state];
        var nextQValues = this._q[nextState];
        var maxNextQValue = getIndexOfMaxValue(nextQValues);
        var learnedValue = reward + this._options.discountFactor * maxNextQValue;
        var tdError = learnedValue - qValues[action];
        // if (tdError > this._options.tdErrorClamp) {
        //     tdError = this._options.tdErrorClamp;
        // }
        // if (tdError < -this._options.tdErrorClamp) {
        //     tdError = -this._options.tdErrorClamp;
        // }
        var adjustment = this._options.learningRate * tdError;
        qValues[action] += adjustment;
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    /**
     *
     * @param lastReward
     * @param state
     * @returns {string}
     */
    getAction(lastReward, state) {
        if (!this._q[state]) {
            this._q[state] = new Float64Array(this._possibleActionCount);
            // for (var i = 0; i < this._possibleActionCount; i++) {
            //     this._q[state][i] = Math.random();//@TODO use gaussian distribution?
            // }
        }

        var currentQ = this._q[state];
        var currentMaxQ = getIndexOfMaxValue(currentQ);

        if (lastReward !== null) {
            this._learnFromStep(this.lastStep.state, this.lastStep.action, lastReward, state);

            var replayMemoryLength = this._replayMemory.length;
            if (replayMemoryLength > this._options.replaysPerAction) {
                for (var i = 0; i < this._options.replaysPerAction; i++) {
                    var replay = this._replayMemory[getRandomIntWithZeroMin(replayMemoryLength)];
                    this._learnFromStep(replay[0], replay[1], replay[2], replay[3]);
                }
            }

            this._actionsTillNextReplayRecording--;
            if (this._actionsTillNextReplayRecording < 1) {
                this._actionsTillNextReplayRecording = this._options.actionsBetweenRecordingNewReplays;
                //Trim down the replay memory any time it gets 20% larger than its allowed size
                if (this._replayMemory.length > this._options.replayCountToStore * 1.2) {
                    this._replayMemory = this._replayMemory.slice(-1 * this._options.replayCountToStore);
                }

                //@TODO only store replayes every so often
                this._replayMemory.push([this.lastStep.state, this.lastStep.action, lastReward, state]);
            }
        }

        var action = currentMaxQ;

        let actionWasRandom = false;
        if (Math.random() < this._options.randomActionProbability) {
            actionWasRandom = true;
            action = getRandomIntWithZeroMin(this._possibleActionCount);
        }

        this.lastStep.state = state;
        this.lastStep.action = action;

        if (settings.renderingEnabled) {
            renderActionResponse({weights: currentQ, wasRandom: actionWasRandom});
            renderReward(lastReward);
            renderQTableSize(Object.keys(this._q).length);
            // renderObservationKey(state);
            // renderAdjustmentValue(adjustment.toFixed(2));
        }

        return action;
    }
}


var tabularQLearner = new Tabular_Q_Learner(4);
tabularQLearner.fromJson(savedBrain);
var tabularQLearnerHasBeenInititalized = false;
export default class Tabular_Q_Learner_Adaptor {
    constructor() {
        this._lastScore = null;
    }

    _observationToKey(observation) {
        return arrayOfBinariesToInt(matrixToVector(
            viewportConversions.convert9x9to5x3(observation.tileTypes)
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
        return actions[tabularQLearner.getAction(reward, observationKey)];
    }

    newGame() {

    }

    clearBrain() {
        tabularQLearner = new Tabular_Q_Learner(4);
        tabularQLearnerHasBeenInititalized = false;
    }

    exportBrain() {
        return tabularQLearner.toJson();
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

var qTableSizeElement;
function renderQTableSize(size) {
    if (!qTableSizeElement) {
        qTableSizeElement = document.createElement('DIV');
        qTableSizeElement.id = 'qTableSize';
        document.getElementById('agentRendererContainer').appendChild(qTableSizeElement);
    }
    qTableSizeElement.innerHTML = 'Unique observations seen: ' + size;
}
