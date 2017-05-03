import Matrix from './Matrix'
import * as arrayMath from './arrayMath'
import {getRandomIntWithZeroMin} from './random'
export default class Agent {
    constructor(numberOfStates, maxNumberOfActions, neuralNetwork, options) {
        var defaultOptions = {
            discountFactor: 0.75, //was .075, future reward discount factor
            randomActionProbability: 0.05,// for epsilon-greedy policy
            learningRate: 0.01,//was 0.01, value function learning rate
            experienceRecordInterval: 25,// number of time steps before we add another experience to replay memory
            experienceSize: 5000,// size of experience replay
            learningStepsPerIteration: 10,
            tdErrorClamp: 1.0
        };

        this._options = Object.assign(defaultOptions, options);

        this.numberOfInputs = numberOfStates;
        this.numberOfActions = maxNumberOfActions;

        this._neuralNetwork = neuralNetwork;
        this._lastActionStats = {
            action: 0,
            wasRandom: false,
            weights: new Float64Array(maxNumberOfActions),
            tdError: 0
        };

        this.exp = []; // experience records
        this.expi = 0; // where to insert new experience

        this.t = 0;

        this.lastReward = null;
        this.lastObservation = null;
        this.currentObservation = null;
        this.lastAction = null;
        this.currentAction = null;
    }

    /**
     *
     * @param {Number} lastReward - pass null if this is the first step or you want to skip learning
     * @param {Array} currentObservation
     * @returns {*}
     */
    learnAndAct(lastReward, currentObservation) {
        var tdError = 0;
        if (lastReward !== null) {
            tdError = this._learn(lastReward);
        }

        // convert to a Matrix column vector
        var state = new Matrix(this.numberOfInputs, 1);
        state.setFrom(currentObservation);

        let actionWasRandom = false;
        let actionWeights = null;
        let action;

        // epsilon greedy policy
        if (Math.random() < this._options.randomActionProbability) {
            action = getRandomIntWithZeroMin(this.numberOfActions);
            actionWasRandom = true;
        } else {
            // greedy wrt Q function
            var actionMatrix = this._neuralNetwork.forward(state, false);

            actionWeights = actionMatrix.w;
            action = arrayMath.getIndexOfMaxValue(actionMatrix.w); // returns index of argmax action
        }

        // shift state memory
        this.lastObservation = this.currentObservation;
        this.lastAction = this.currentAction;
        this.currentObservation = state;
        this.currentAction = action;

        var lastActionStats = this._lastActionStats;
        lastActionStats.action = action;
        lastActionStats.wasRandom = actionWasRandom;
        lastActionStats.weights = actionWeights;
        lastActionStats.tdError = tdError;

        return action;
    }

    getLastActionStats() {
        return this._lastActionStats;
    }

    _learn(r1) {
        // perform an update on Q function
        if (!(this.lastReward == null) && this._options.learningRate > 0) {

            // learn from this tuple to get a sense of how "surprising" it is to the agent
            var tdError = this._learnFromExample(this.lastObservation, this.lastAction, this.lastReward, this.currentObservation);

            // decide if we should keep this experience in the replay
            if (this.t % this._options.experienceRecordInterval === 0) {
                this.exp[this.expi] = [this.lastObservation, this.lastAction, this.lastReward, this.currentObservation];
                this.expi += 1;
                if (this.expi > this._options.experienceSize) {
                    this.expi = 0;
                } // roll over when we run out
            }
            this.t += 1;

            // sample some additional experience from replay memory and learn from it
            for (var k = 0; k < this._options.learningStepsPerIteration; k++) {
                var ri = getRandomIntWithZeroMin(this.exp.length); // todo: priority sweeps?
                var e = this.exp[ri];
                this._learnFromExample(e[0], e[1], e[2], e[3])
            }
        }
        this.lastReward = r1; // store for next update
        return tdError;
    }

    _learnFromExample(lastObservation, lastAction, lastReward, currentObservation) {

        // goal: Q(s,a) = r + discountFactor * max_a' Q(s',a')

        var actionMatrix = this._neuralNetwork.forward(currentObservation, false);
        var estimatedFutureReward = actionMatrix.w[arrayMath.getIndexOfMaxValue(actionMatrix.w)];

        var prediction = this._neuralNetwork.forward(lastObservation, true);
        var lastActionPredictedReward = prediction.w[lastAction];

        var tdError = lastActionPredictedReward - lastReward - estimatedFutureReward * this._options.discountFactor;

        if (tdError > this._options.tdErrorClamp) {
            tdError = this._options.tdErrorClamp
        } else if (tdError < -this._options.tdErrorClamp) {
            tdError = -this._options.tdErrorClamp
        }

        var outputError = new Matrix(this.numberOfActions, 1);
        outputError.w[lastAction] = tdError;

        this._neuralNetwork.backPropagate(outputError, this._options.learningRate);

        return tdError;
    }
};
