import Matrix from './Matrix'
import * as arrayMath from './arrayMath'
import {getRandomIntWithZeroMin} from './random'
export default class Agent {
    constructor(numberOfStates, maxNumberOfActions, neuralNetwork, options) {
        var defaultOptions = {
            discountFactor: 0.75, // future reward discount factor
            randomActionProbability: 0.1,// for epsilon-greedy policy
            learningRate: 0.01,// value function learning rate
            experienceRecordInterval: 25,// number of time steps before we add another experience to replay memory
            experienceSize: 5000,// size of experience replay
            learningStepsPerIteration: 10,
            tdErrorClamp: 1.0,
            stepsBehind: 1,
            calculateQEvenDuringRandomActions: true, //false for speed, true for better charts
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

        this.r0 = null;
        this.s0 = null;
        this.s1 = null;
        this.a0 = null;
        this.a1 = null;

        this.lastExamples = [];
        this.exampleI = 0;
    }

    /**
     * @TODO better handle terminal states
     *
     * @param lastReward
     * @param currentObservation
     * @param isFirstStep
     * @returns {*}
     */
    learnAndAct(lastReward, currentObservation, isFirstStep) {
        var tdError = 0;

        if (lastReward === null && !isFirstStep) {
            throw new Error('lastReward can only bu null if on first step');
        }

        if (lastReward !== null) {
            this.lastExamples[this.exampleI].reward = lastReward;
        }

        // convert to a Matrix column vector
        var state = new Matrix(this.numberOfInputs, 1);
        state.setFrom(currentObservation);

        this.exampleI++;
        this.lastExamples[this.exampleI] = {};
        this.lastExamples[this.exampleI].observation = state;
        this.lastExamples[this.exampleI].isFirstStep = isFirstStep;
        // console.log('state1',state.w);

        // if (this.exampleI == 1) {
        //     this.exampleI = 0;
        // }


        if (lastReward !== null && this.exampleI > this._options.stepsBehind) {
            tdError = this._learnFromExampleSet();
            // tdError = this._learn(lastReward);
        }

        let actionWasRandom = false;
        let actionWeights = null;
        let action;

        // epsilon greedy policy
        if (Math.random() < this._options.randomActionProbability) {
            action = getRandomIntWithZeroMin(this.numberOfActions);
            actionWasRandom = true;
        }

        if (!actionWasRandom || this._options.calculateQEvenDuringRandomActions) {
            // greedy wrt Q function
            var actionMatrix = this._neuralNetwork.forward(state, false);

            actionWeights = actionMatrix.w;
            if (!actionWasRandom) {
                action = arrayMath.getIndexOfMaxValue(actionMatrix.w);
            }

        }

        // console.log('state2',state.w);

        // shift state memory
        this.s0 = this.s1;
        this.a0 = this.a1;
        this.s1 = state;
        this.a1 = action;

        var lastActionStats = this._lastActionStats;
        lastActionStats.action = action;
        lastActionStats.wasRandom = actionWasRandom;
        lastActionStats.weights = actionWeights;
        lastActionStats.tdError = tdError;

        this.lastExamples[this.exampleI].action = action;

        return action;
    }

    getLastActionStats() {
        return this._lastActionStats;
    }

    _learnFromExampleSet() {
        var step = this.lastExamples[this.exampleI - this._options.stepsBehind];
        // perform an update on Q function
        if (!(step.reward == null) && this._options.learningRate > 0) {

            step.hindsightReward = step.reward;
            for (var i = 1; i != this._options.stepsBehind; i++) {
                if (this.lastExamples[this.exampleI - this._options.stepsBehind + i + 1].isFirstStep) {
                    break;
                }
                // console.log(i, this.lastExamples[this.exampleI - this._options.stepsBehind + i]);
                step.hindsightReward += this.lastExamples[this.exampleI - this._options.stepsBehind + i].reward
                    * (Math.pow(this._options.discountFactor, i));
                if (isNaN(step.hindsightReward)) {//@TODO remove this slow sanity check code
                    throw new Error('hindsightReward is not a number');
                }
            }


            // step.hindsightReward2 = step.reward + this._estimateMaxQ(
            //         this.lastExamples[this.exampleI - this._options.stepsBehind + 1].observation
            //     ) * this._options.discountFactor;

            // console.log(step.hindsightReward-step.hindsightReward2, step.hindsightReward, step.hindsightReward2);
            // console.log(step.reward, step.hindsightReward, step.hindsightReward2, this._estimateMaxQ(
            //     this.lastExamples[this.exampleI - this._options.stepsBehind + 1].observation
            // ));

            // learn from this tuple to get a sense of how "surprising" it is to the agent
            var tdError = this._learnFromExample(
                step.observation,
                step.action,
                step.hindsightReward,
                this.lastExamples[this.exampleI - this._options.stepsBehind + 1].observation
                // this.lastExamples[this.exampleI - this._options.stepsBehind+1].reward
            );

            // decide if we should keep this experience in the replay
            if (this.t % this._options.experienceRecordInterval === 0) {
                this.exp[this.expi] = [
                    step.observation,
                    step.action,
                    step.hindsightReward,
                    this.lastExamples[this.exampleI - this._options.stepsBehind + 1].observation
                    // this.lastExamples[this.exampleI - 2].reward
                ];
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
                this._learnFromExample(e[0], e[1], e[2], e[3], e[4])
            }
        }
        // this.lastExamples[this.exampleI-1].reward = r1; // store for next update
        return tdError;
    }

    _learn(r1) {
        // perform an update on Q function
        if (!(this.r0 == null) && this._options.learningRate > 0) {

            if (this.exampleI > 2 && JSON.stringify(this.lastExamples[this.exampleI - 2].observation.w) !== JSON.stringify(this.s0.w)) {
                console.error(this.lastExamples[this.exampleI - 2].observation.w, this.s0.w);
                console.error(JSON.stringify(this.lastExamples[this.exampleI - 2].observation.w), JSON.stringify(this.s0.w));
                throw new Error();
            }

            // learn from this tuple to get a sense of how "surprising" it is to the agent
            var tdError = this._learnFromExample(this.s0, this.a0, this.r0, this.s1);

            // decide if we should keep this experience in the replay
            if (this.t % this._options.experienceRecordInterval === 0) {
                this.exp[this.expi] = [this.s0, this.a0, this.r0, this.s1];
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
        this.r0 = r1; // store for next update
        return tdError;
    }

    _learnFromExample(s0, a0, r0, s1) {

        // want: Q(s,a) = r + gamma * max_a' Q(s',a')

        // compute the target Q value
        // var tmat = this._neuralNetwork.forward(s1, false);
        var qmax = r0 + this._estimateMaxQ(s1);

        // now predict
        var pred = this._neuralNetwork.forward(s0, true);

        var tdError = pred.w[a0] - qmax;
        var clamp = this._options.tdErrorClamp;

        if (tdError > clamp) {
            tdError = clamp
        } else if (tdError < -clamp) {
            tdError = -clamp
        }

        var outputError = new Matrix(this.numberOfActions, 1);
        outputError.w[a0] = tdError;

        this._neuralNetwork.backPropagate(outputError, this._options.learningRate);

        if (isNaN(tdError)) {
            throw new Error('TD Error is not number.');
        }

        return tdError;
    }

    /**
     * Get the expected reward of taking the best action in the given observation
     *
     * @param observation
     * @returns {number}
     * @private
     */
    _estimateMaxQ(observation) {
        var actionMatrix = this._neuralNetwork.forward(observation, false);
        // console.log('d',actionMatrix.w[arrayMath.getIndexOfMaxValue(actionMatrix.w)], actionMatrix.w);
        return this._options.discountFactor * actionMatrix.w[arrayMath.getIndexOfMaxValue(actionMatrix.w)];
    }
};
