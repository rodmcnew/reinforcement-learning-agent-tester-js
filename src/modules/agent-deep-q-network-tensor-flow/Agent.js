import { matrixToFlatArray } from '../environment/nestedFloatMatrixMath'
import { settings } from '../../App' //@TODO use DI instead for this
import { renderActionResponse, renderReward } from '../lib-agent-helper/qStateRenderer'
import { actions, config } from '../environment'
import * as arrayMath from './math/arrayMath'
import { getRandomIntWithZeroMin } from './math/random'
import * as tf from '@tensorflow/tfjs';
// tf.setBackend('cpu', true);//Increased actions per second from 34ish to 44ish in "very fast" view
const inputCount = config.viewPortSize[0] * config.viewPortSize[1];
const numberOfActions = actions.length;
const options = {};
const inputTensorShape = [1, 81];

function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [81], units: 64, activation: 'relu' })); //@TODO make leaky?
    model.add(tf.layers.dense({ units: 4, activation: 'linear' }));
    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
    });
    return model
}

export default class DeepQNetworkTensorFlow {
    constructor() {
        this.learnFromOARO = this.learnFromOARO.bind(this)
        var defaultOptions = {
            discountFactor: 0.9, //was .075, future reward discount factor
            explorationProbability: 0.05
        };

        this.options = Object.assign(defaultOptions, options);

        this.model = createModel();

        this.numberOfInputs = inputCount;
        this.numberOfActions = numberOfActions;

        this.learnAndActCallCount = 0;

        this.connectingObservation = null;
        this.lastOAR = {
            observation: null,
            action: null,
            reward: null
        }

        // this.recentOAROs = [];
    }

    static getName() {
        return 'ReinforcementLearning - DeepQNetworkTensorFlow - 9x9 - untrained'
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {int} action index
     */
    getAction(lastAction, lastReward, observationMatrix) {
        const observation = matrixToFlatArray(observationMatrix);

        this.lastOAR = {
            observation: this.connectingObservation,
            action: lastAction,
            reward: lastReward
        };
        this.connectingObservation = observation;

        // this.recentOAROs.push([this.lastOAR.observation, this.lastOAR.action, this.lastOAR.reward, observation]);
        // if (this.recentOAROs.length > 10) {
        //     this.recentOAROs.map((example) => {
        //         if (example[0] !== null && example[1] !== null && example[2] !== null && example[3] !== null) {
        //             this.learnFromOARO(example[0], example[1], example[2], example[3]);
        //         }
        //     });
        //     this.recentOAROs = [];
        // }
        if (this.lastOAR.observation !== null) {
            this.learnFromOARO(this.lastOAR.observation, this.lastOAR.action, this.lastOAR.reward, observation);
        }

        let actionWasRandom = false;
        let actionWeights = null;
        let action;

        //epsilon greedy policy
        if (Math.random() < this.options.explorationProbability) {
            action = getRandomIntWithZeroMin(this.numberOfActions);
            actionWasRandom = true;
            actionWeights = [0, 0, 0, 0];//@TODO don't hard code action count
        } else {
            // greedy wrt Q function
            var actionMatrix = this.modelPredict(observation);
            actionWeights = actionMatrix;
            action = arrayMath.getIndexOfMaxValue(actionMatrix); // returns index of argmax action
        }

        if (settings.renderingEnabled) {
            renderActionResponse({
                action: action,
                wasRandom: actionWasRandom,
                weights: actionWeights
            });
            if (lastReward !== null) {
                renderReward(lastReward)
            }
        }

        return action;
    }

    newGame() {
        this.connectingObservation = null;
        this.lastOAR = {
            observation: null,
            action: null,
            reward: null
        }
    }

    modelPredict(observationArray) {
        return tf.tidy(() => {
            const observationTensor = tf.tensor(observationArray, inputTensorShape);
            const predictedRewardsByActionTensor = this.model.predictOnBatch(observationTensor);
            const predictedRewardsByActionArray = predictedRewardsByActionTensor.dataSync();
            return predictedRewardsByActionArray;
        });
    }

    modelTrain(observationArray, targetDataArray) {
        const observationTensor = tf.tensor(observationArray, inputTensorShape);
        const targetTensor = tf.tensor(targetDataArray, [1, this.numberOfActions]);
        this.model.trainOnBatch(observationTensor, targetTensor).then((trainOnBatchResult) => {
            observationTensor.dispose();
            targetTensor.dispose();
        });
    }

    learnFromOARO(lastObservation, lastAction, lastReward, currentObservation) {
        const estimatedFutureReward = this.estimateNextActionReward(currentObservation);
        const target = this.modelPredict(lastObservation);
        const targetActionValue = lastReward + estimatedFutureReward * this.options.discountFactor;
        target[lastAction] = targetActionValue;
        this.modelTrain(lastObservation, target);
    }

    estimateNextActionReward(currentObservation) {
        const predictedRewardByAction = this.modelPredict(currentObservation);
        const rewardIfDontExplore = predictedRewardByAction[arrayMath.getIndexOfMaxValue(predictedRewardByAction)];
        const rewardIfExplore = predictedRewardByAction.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue / this.numberOfActions
            }
        );
        return rewardIfDontExplore * (1 - this.options.explorationProbability)
            + rewardIfExplore * this.options.explorationProbability;
    }

    clearBrain() {
        alert('not implemented')
    }

    exportBrain() {
        alert('not implemented')
    }
}
