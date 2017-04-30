import {renderActionResponse, renderReward} from './helper/deepQNetworkAdaptor'
import * as viewportConversions from '../../renderer/viewportConversions'
import {matrixToVector} from '../../tensorTools'
import {settings} from '../../index' //@TODO use DI instead for this

const actions = ['w', 'a', 's', 'd'];

export function getIndexOfMaxValue(array) {
    var maxValue = array[0];
    var maxIndex = 0;
    for (var i = 1, length = array.length; i < length; i++) {
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
            discountFactor: 0.90,
            randomActionProbability: 0.1,
            learningRate: 0.1,
            // tdErrorClamp: 1.0,
        };

        this._possibleActionCount = possibleActionCount;
        this._options = Object.assign(defaultOptions/*, options*/);

        this._lastScore = null;

        this._q = [];//new Array(Math.pow(2, 5 * 3));//@TODO allow state count as arg for higher performance?

        this.lastStep = {};
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
            for (var i = 0; i < this._possibleActionCount; i++) {
                this._q[state][i] = Math.random();//@TODO use gaussian distribution?
            }
        }

        var currentQ = this._q[state];
        var currentMaxQ = getIndexOfMaxValue(currentQ);

        let adjustment = 0;
        if (lastReward !== null) {
            var lastQ = this._q[this.lastStep.state];
            const learnedValue = lastReward + this._options.discountFactor * currentMaxQ;
            adjustment = this._options.learningRate * (learnedValue - lastQ[this.lastStep.action]);
            lastQ[this.lastStep.action] += adjustment;
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

            if (Math.random() < .001) {
                if (!document.getElementById('q-learning-data')) {
                    let div = document.createElement('div');
                    let label = document.createElement('div');
                    label.innerHTML = '<br/>Agent Brain Dump:';
                    let textArea = document.createElement("TEXTAREA");
                    textArea.style.width = '100%';
                    textArea.style.height = '10em';
                    textArea.setAttribute('id', 'q-learning-data');
                    div.appendChild(label);
                    div.appendChild(textArea);
                    document.body.appendChild(div);
                }
                document.getElementById('q-learning-data').innerHTML = JSON.stringify(this._q);
            }
        }

        return action;
    }
}


var tabularQLearner = new Tabular_Q_Learner(4);
var tabularQLearnerHasBeenInititalized = false;
export default class Tabular_Q_Learner_Adaptor {
    constructor() {
        this._lastScore = null;
    }

    _observationToKey(observation) {
        return arrayOfBinariesToInt(matrixToVector(
            viewportConversions.convert9x9to3x2(observation.tileTypes)
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
}


var adjustmentValueElement;
function renderAdjustmentValue(value) {
    if (!adjustmentValueElement) {
        adjustmentValueElement = document.createElement('DIV');
        adjustmentValueElement.id = 'adjustmentValue';
        document.getElementById('agentRendererContainer').appendChild(adjustmentValueElement);
    }
    adjustmentValueElement.innerHTML = 'Q adjustment value: ' + value;
}

var observationKeyElement;
function renderObservationKey(key) {
    if (!observationKeyElement) {
        observationKeyElement = document.createElement('DIV');
        observationKeyElement.id = 'observationKey';
        document.getElementById('agentRendererContainer').appendChild(observationKeyElement);
    }
    observationKeyElement.innerHTML = 'Q table key: ' + key;
}

var qTableSizeElement;
function renderQTableSize(size) {
    if (!qTableSizeElement) {
        qTableSizeElement = document.createElement('DIV');
        qTableSizeElement.id = 'qTableSize';
        document.getElementById('agentRendererContainer').appendChild(qTableSizeElement);
    }
    qTableSizeElement.innerHTML = 'Unique observations seen: ' + size;
}