import {renderActionResponse, renderReward} from './helper/deepQNetworkAdaptor'
import * as viewportConversions from '../../environment/viewportConversions'
import {matrixToFlatArray} from '../../environment/nestedFloatMatrixMath'
import {settings} from '../../App' //@TODO use DI instead for this
import {data as savedBrain} from '../../data/saves/tabular-sarsa-5x3'

const actions = ['w', 'a', 's', 'd'];

// export function getIndexOfMaxValue(array) {
//     var maxValue = array[0];
//     var maxIndex = 0;
//     for (var i = 1, length = array.length; i < length; i++) {
//         var v = array[i];
//         if (v > maxValue) {
//             maxIndex = i;
//             maxValue = v;
//         }
//     }
//     return maxIndex;
// }

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

export class TabularSARSA {
    constructor(possibleStateCount, possibleActionCount) {
        var defaultOptions = {
            discountFactor: 0.9,//gamma
            randomActionProbability: 0.05,//epsilon
            learningRate: 0.1,//alpha
            replaysPerAction: 10,
            replayCountToStore: 5000,
            actionsBetweenRecordingNewReplays: 25,
            // tdErrorClamp: 1.0,
        };

        this._replayMemory = [];//@TODO trim this, don't store all
        this._actionsTillNextReplayRecording = 0;

        this._actionCount = possibleActionCount;
        this._stateCount = possibleStateCount;
        this._options = Object.assign(defaultOptions/*, options*/);

        this._lastScore = null;

        this._q = new Float64Array(this._stateCount * this._actionCount); //[];//new Array(Math.pow(2, 5 * 3));//@TODO allow state count as arg for higher performance?
        this._initializedQ = new Int8Array(this._stateCount * this._actionCount);
        this._lastActionWeights = new Float64Array(this._actionCount);

        this.oneMinusEpsilon = 1 - this._options.randomActionProbability;//cached calculations to increase performance
        this.epsilonDividedByActionCount = this._options.randomActionProbability / this._actionCount;//cached calculations to increase performance

        this.lastStep = {};
    }

    fromJson(json) {
        for (var i = 0, len = this._stateCount * this._actionCount; i < len; i++) {
            this._q[i] = json.q[i];
            this._initializedQ[i] = json.initializedQ[i];
        }
    }

    toJson() {
        var q = [];
        var initializedQ = [];
        for (var i = 0, len = this._stateCount * this._actionCount; i < len; i++) {
            q[i] = this._q[i];
            initializedQ[i] = this._initializedQ[i];
        }
        return {q: q, initializedQ: initializedQ};
    }

    /**
     * The SARSA algorithm with an epsilon greedy policy
     *
     * @param state
     * @param action
     * @param reward
     * @param nextState
     * @private
     */
    _learnFromStep(state, action, reward, nextState) {
        var currentStateActionKey = state * this._actionCount + action;
        var qOfCurrentStateAction = this._q[currentStateActionKey];

        if (qOfCurrentStateAction === 0.00
            && this._initializedQ[currentStateActionKey] !== 1
        ) {
            //Use first seen reward for a state-action as the initial value to speed up initial learning
            this._initializedQ[currentStateActionKey] = 1;//1 for true
            this._q[currentStateActionKey] = reward;
        }

        var options = this._options;
        var nextStateKeyPrepend = nextState * this._actionCount;
        var maxQofNextStateAction = this._q[nextStateKeyPrepend];
        var sumQofNextStateAction = this._q[nextStateKeyPrepend];
        for (var i = nextStateKeyPrepend + 1, max = nextStateKeyPrepend + this._actionCount; i < max; i++) {
            var thisValue = this._q[i];
            sumQofNextStateAction += thisValue;
            if (thisValue > maxQofNextStateAction) {
                maxQofNextStateAction = thisValue;
            }
        }

        var qOfNextStateAction = maxQofNextStateAction * this.oneMinusEpsilon
            + sumQofNextStateAction * this.epsilonDividedByActionCount;

        this._q[currentStateActionKey] = qOfCurrentStateAction +
            options.learningRate * (reward + options.discountFactor * qOfNextStateAction - qOfCurrentStateAction);
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


        var action;
        let actionWasRandom = false;
        if (Math.random() < this._options.randomActionProbability) {
            //@TODO this._lastActionWeights not being set in this branch
            actionWasRandom = true;
            action = getRandomIntWithZeroMin(this._actionCount);
        } else {
            var currentStateKeyPrepend = state * this._actionCount;
            var maxQofNextStateAction = this._q[currentStateKeyPrepend];
            this._lastActionWeights[0] = maxQofNextStateAction;//The loop below skips the first one so do it here
            var indexOfMaxQofNextStateAction = 0;
            var index = 0;
            for (var key = currentStateKeyPrepend + 1, max = currentStateKeyPrepend + this._actionCount; key < max; key++) {
                index++;
                var thisValue = this._q[key];
                if (thisValue > maxQofNextStateAction) {
                    maxQofNextStateAction = thisValue;
                    indexOfMaxQofNextStateAction = index;
                    this._lastActionWeights[index] = thisValue;
                }
            }
            action = indexOfMaxQofNextStateAction;
        }

        this.lastStep.state = state;
        this.lastStep.action = action;

        if (settings.renderingEnabled) {
            renderActionResponse({weights: this._lastActionWeights, wasRandom: actionWasRandom});
            renderReward(lastReward);
            // renderQTableSize(Object.keys(this._q).length);
            // renderObservationKey(state);
            // renderAdjustmentValue(adjustment.toFixed(2));
        }

        // if (typeof action === 'undefined') {
        //     throw new Error('action is undefined');
        // }

        return action;
    }
}

const actionCount = 4;
// const stateCount = Math.pow(2, 5 * 4);
const stateCount = Math.pow(2, 5 * 3);
var tabularQLearner = new TabularSARSA(stateCount, actionCount);
tabularQLearner.fromJson(savedBrain);//Load previously saved brain
var tabularQLearnerHasBeenInititalized = false;
export default class TabularSARSA_5x3Viewport_Adaptor {
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
        return actions[tabularQLearner.getAction(reward, observationKey)];
    }

    newGame() {

    }

    clearBrain() {
        tabularQLearner = new TabularSARSA(stateCount, actionCount);
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
