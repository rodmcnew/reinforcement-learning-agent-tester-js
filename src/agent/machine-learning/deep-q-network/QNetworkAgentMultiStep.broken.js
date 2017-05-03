import Matrix from './Matrix'
import * as arrayMath from './arrayMath'
import {getRandomIntWithZeroMin} from './random'
export default class Agent {
    constructor(numberOfStates, maxNumberOfActions, neuralNetwork, options) {
        var defaultOptions = {
            discountFactor: 0.75, // future reward discount factor
            randomActionProbability: 0.1,// for epsilon-greedy policy
            learningRate: 0.01,//was 0.01, value function learning rate
            experienceRecordInterval: 25,// number of time steps before we add another experience to replay memory
            experienceSize: 5000,// size of experience replay
            replaysPerIteration: 10, //was 10 before multi q
            tdErrorClamp: 1.0,
            learnEveryNSteps: 1
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

        // this.r0 = null;
        // this.s0 = null;
        // this.s1 = null;
        // this.a0 = null;
        // this.a1 = null;

        this.history = [];

        this.nStep = 0;
        this.step = 0;//@todo remove this is for debug only

        this.lastObservation = null;
        this.lastAction = null;
    }

    _learnFromHistoricalRecord(record) {
        for (var i = 0, length = record.length; i < length; i++) {
            this._learnFromHistoricalRecordStep(record[i]);
        }
    }

    _calculateRewardsInHistoricalRecord(record) {
        var length = record.length;
        for (var i = length - 1; i !== -1; i--) {
            // console.log(i);
            var thisRecord = record[i];
            // thisRecord.i = i;//@TODO remove this is for debug only
            if (i !== 0) {
                var discountedFutureReward = thisRecord.reward * this._options.discountFactor;
                var lastRecord = record[i - 1];
                lastRecord.originalReward = lastRecord.reward;//Important if final reward is updateed and we re-calc the rest
                // lastRecord.parentRewardWas = thisRecord.reward;//@TODO remove this is for debug only
                // lastRecord.discountedFutureRewardCalcWas = thisRecord.reward + '*' + this._options.discountFactor + '=' + discountedFutureReward;//@TODO remove this is for debug only
                // lastRecord.discountedFutureRewardWas = discountedFutureReward;//@TODO remove this is for debug only
                // lastRecord.divder = length - i + 1;//@TODO remove this is for debug only
                lastRecord.reward = (lastRecord.originalReward + discountedFutureReward);// / (length - i + 1);
            }
        }
    }

    /**
     *
     * @param {Number} lastReward - pass null if this is the first step or you want to skip learning
     * @param {Array} currentObservation
     * @returns {*}
     */
    learnAndAct(lastReward, currentObservation) {
        // console.log('r', this._lastActionStats.action, lastReward);
        var tdError = 0;

        this.step++;//@TODO remove this is for debug only

        if (lastReward !== null) {

            if (this.history[this.nStep]) {
                this.history[this.nStep].reward = lastReward;
            }


            this.history[this.nStep] = {};
            this.history[this.nStep].observation = this.lastObservation;
            this.history[this.nStep].action = this.lastAction;
            this.history[this.nStep].reward = lastReward;

            this.history[this.nStep].step = this.step;//@TODO remove this. this is for debug only

            this.nStep++;
            if (this.nStep == this._options.learnEveryNSteps) {
                this.nStep = 0;

                var historyRecord = this.history.slice();//@TODO remove slice
                var lastStep = historyRecord[this._options.learnEveryNSteps - 1];
                if (lastStep.action != this._lastActionStats.action || lastStep.reward != lastReward) {
                    throw new Error('Last reward or last action mismatch');
                }
                this._calculateRewardsInHistoricalRecord(historyRecord);
                this._learnFromHistoricalRecord(historyRecord);
                this._saveHistoryForReplay(historyRecord);
                this._learnFromHistoryReplays();
                historyRecord = null;

                this.history = [];
            }
        }

        // if (lastReward !== null) {
        //     tdError = this._learn(lastReward);
        // }

        // convert to a Matrix column vector
        var observation = new Matrix(this.numberOfInputs, 1);
        observation.setFrom(currentObservation);

        let actionWasRandom = false;
        let actionWeights = null;
        let action;

        // epsilon greedy policy
        if (Math.random() < this._options.randomActionProbability) {
            action = getRandomIntWithZeroMin(this.numberOfActions);
            actionWasRandom = true;
        } else {
            // greedy wrt Q function
            var actionMatrix = this._neuralNetwork.forward(observation);

            actionWeights = actionMatrix.w;
            action = arrayMath.getIndexOfMaxValue(actionMatrix.w); // returns index of argmax action
        }

        // shift state memory
        // this.s0 = this.s1;
        // this.a0 = this.a1;
        // this.s1 = observation;
        // this.a1 = action;

        var lastActionStats = this._lastActionStats;
        lastActionStats.action = action;
        lastActionStats.wasRandom = actionWasRandom;
        lastActionStats.weights = actionWeights;
        lastActionStats.tdError = tdError;

        this.lastObservation = observation;
        this.lastAction = action;

        return action;
    }

    getLastActionStats() {
        return this._lastActionStats;
    }

    _saveHistoryForReplay(historyToSave) {
        // decide if we should keep this experience in the replay
        if (this.t % this._options.experienceRecordInterval === 0) {
            this.exp[this.expi] = historyToSave;
            this.expi += 1;
            if (this.expi > this._options.experienceSize) {// roll over when we run out
                this.expi = 0;
            }
        }
        this.t += 1;
    }

    _learnFromHistoryReplays() {
        // sample some additional experience from replay memory and learn from it
        if (this.exp.length < this._options.replaysPerIteration) {
            return;
        }
        for (var k = 0; k < this._options.replaysPerIteration; k++) {
            var ri = getRandomIntWithZeroMin(this.exp.length); // todo: priority sweeps?
            var record = this.exp[ri];
            this._learnFromHistoricalRecord(record);
        }
    }

    //
    // _learn(r1) {
    //     // perform an update on Q function
    //     if (!(this.r0 == null) && this._options.learningRate > 0) {
    //
    //         // learn from this tuple to get a sense of how "surprising" it is to the agent
    //         // var tdError = this._learnFromExample(this.s0, this.a0, this.r0, this.s1);
    //
    //
    //     }
    //     this.r0 = r1; // store for next update
    //     return;// tdError;
    // }
    //
    // _learnFromExample(s0, a0, r0, s1) {
    //
    //     // want: Q(s,a) = r + gamma * max_a' Q(s',a')
    //
    //     var qmax = r0 + this._options.discountFactor * this._q(s1);
    //
    //     // now predict
    //     var pred = this._neuralNetwork.forward(s0);
    //
    //     var tdError = pred.w[a0] - qmax;
    //     var clamp = this._options.tdErrorClamp;
    //
    //     if (tdError > clamp) {
    //         tdError = clamp
    //     } else if (tdError < -clamp) {
    //         tdError = -clamp
    //     }
    //
    //     var outputError = new Matrix(this.numberOfActions, 1);
    //     outputError.w[a0] = tdError;
    //
    //     this._neuralNetwork.backPropagate(outputError, this._options.learningRate);
    //
    //     return tdError;
    // }

    _learnFromHistoricalRecordStep(step) {
        // console.log(step.action, step.reward);

        // now predict
        var pred = this._neuralNetwork.forward(step.observation);

        var tdError = pred.w[step.action] - step.reward;
        var clamp = this._options.tdErrorClamp;

        if (tdError > clamp) {
            tdError = clamp
        } else if (tdError < -clamp) {
            tdError = -clamp
        }

        var outputError = new Matrix(this.numberOfActions, 1);//@TODO re-use instance of re-instantiate for performance
        outputError.w[step.action] = tdError;

        this._neuralNetwork.backPropagate(outputError, this._options.learningRate);
    }

    _q(observation) {
        var rewardMatrix = this._neuralNetwork.forward(observation);
        return rewardMatrix.w[arrayMath.getIndexOfMaxValue(rewardMatrix.w)];
    }
};
