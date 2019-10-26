// import Matrix from './Matrix'
import './neural-network/networkTest'
import * as arrayMath from './math/arrayMath'
import {getRandomIntWithZeroMin} from './math/random'
import NeuralNetwork from './neural-network/NeuralNetwork'
export default class Agent {
    constructor(inputCount, numberOfActions, options) {
        var defaultOptions = {
            discountFactor: 0.9, //was .075, future reward discount factor
            randomActionProbability: 0.05,// for epsilon-greedy policy
            learningRate: 0.01,//was 0.01, value function learning rate //@TODO this is not used in the NN anymore
            experienceRecordInterval: 25,// number of time steps before we add another experience to replay memory
            experienceSize: 5000,// size of experience replay
            learningStepsPerIteration: 10,
            tdErrorClamp: 1.0
        };

        this._options = Object.assign(defaultOptions, options);

        this._neuralNetwork = new NeuralNetwork(inputCount, 64, numberOfActions);//@TODO use state count rather than 100?

        this.numberOfInputs = inputCount;
        this.numberOfActions = numberOfActions;

        this._lastActionStats = {
            action: 0,
            wasRandom: false,
            weights: new Float32Array(numberOfActions),
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
        // var state = new Matrix(this.numberOfInputs, 1);
        // state.setFrom(currentObservation);

        var state = currentObservation;

        let actionWasRandom = false;
        let actionWeights = null;
        let action;


        // greedy wrt Q function
        var actionMatrix = this._neuralNetwork.invoke(state);

        actionWeights = actionMatrix;
        action = arrayMath.getIndexOfMaxValue(actionMatrix); // returns index of argmax action

        //epsilon greedy policy
        if (Math.random() < this._options.randomActionProbability) {
            action = getRandomIntWithZeroMin(this.numberOfActions);
            actionWasRandom = true;
        }

        // action = 0;

        // console.log(actionWeights);

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
        if (this.lastObservation !== null && this.lastReward !== null && this._options.learningRate > 0) {

            // learn from this tuple to get a sense of how "surprising" it is to the agent
            var tdError = this._learnFromExample(this.lastObservation, this.lastAction, this.lastReward, this.currentObservation);

            // decide if we should keep this experience in the replay //@TODO don't use this.t for replays
            if (this.t % this._options.experienceRecordInterval === 0) {
                this.exp[this.expi] = [this.lastObservation, this.lastAction, this.lastReward, this.currentObservation];
                this.expi += 1;
                if (this.expi > this._options.experienceSize) {
                    this.expi = 0;
                } // roll over when we run out
            }
            this.t += 1;

            // sample some additional experience from replay memory and learn from it//@TODO re-enable
            for (var k = 0; k < this._options.learningStepsPerIteration; k++) {
                var ri = getRandomIntWithZeroMin(this.exp.length);
                var e = this.exp[ri];
                this._learnFromExample(e[0], e[1], e[2], e[3])
            }
        }
        this.lastReward = r1; // store for next update
        return tdError;
    }

    _learnFromExample(lastObservation, lastAction, lastReward, currentObservation) {

        // goal: Q(s,a) = r + discountFactor * max_a' Q(s',a')

        var actionMatrix = this._neuralNetwork.invoke(currentObservation);
        var estimatedFutureReward = actionMatrix[arrayMath.getIndexOfMaxValue(actionMatrix)];

        var prediction = this._neuralNetwork.invoke(lastObservation);
        // var lastActionPredictedReward = prediction[lastAction];
        //
        // var tdError = lastActionPredictedReward - lastReward - estimatedFutureReward * this._options.discountFactor;
        //
        // if (tdError > this._options.tdErrorClamp) {
        //     tdError = this._options.tdErrorClamp
        // } else if (tdError < -this._options.tdErrorClamp) {
        //     tdError = -this._options.tdErrorClamp
        // }
//@TODO td error clamp?
        var target = prediction.slice();
        var targetActionValue = lastReward + estimatedFutureReward * this._options.discountFactor;//@TODO uncomment
        target[lastAction] = targetActionValue;

        // console.log('pred', prediction);
        // console.log('targ', target);
        this._neuralNetwork.learn(target);
        // console.log('npre', this._neuralNetwork.invoke(lastObservation));
        // console.log('-');
//@TODO learn only from error output and not others?
        var error = (prediction[lastAction] - targetActionValue);
        // console.log('error:' + error);
        return error; //@TODO chart error?
    }

    loadFromJson(json) {
        this._neuralNetwork.loadFromJson(json);
    }

    saveToJson() {
        return this._neuralNetwork.saveToJson();
    }
};
