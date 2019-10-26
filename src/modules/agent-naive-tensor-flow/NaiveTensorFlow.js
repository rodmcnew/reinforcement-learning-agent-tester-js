import { matrixToFlatArray } from '../environment/nestedFloatMatrixMath'
import { actions } from '../environment'
import RewardCalculator from '../lib-agent-helper/RewardCalculator'
import * as tf from '@tensorflow/tfjs';
import { renderActionResponse, renderReward } from '../lib-agent-helper/qStateRenderer'
import { settings } from '../../App' //@TODO use DI instead for this
import * as viewportConversions from '../environment/viewportConversions'

let rewardCalculator = new RewardCalculator();

const model = tf.sequential();
model.add(tf.layers.flatten({ inputShape: [5, 5] }));
model.add(tf.layers.dense({ units: 16, activation: 'relu' })); //@TODO make leaky?
model.add(tf.layers.dense({ units: 4, activation: 'linear' }));
model.compile({
    optimizer: 'adam',
    loss: 'meanSquaredError'
});

export default class NaiveTensorFlow {
    constructor() {
        rewardCalculator = new RewardCalculator();
        this.lastObservationArray = null;
        this.lastActionIndex = null;
    }

    static getName() {
        return 'ReinforcementLearning? - NaiveNetworkTensorFlow - 5x5 - untrained';
    }

    static getDescription() {
        return 'This agent runs a tensorflow neural net to predict the reward of the next step only.'
            + ' It does not take further future steps into account.';
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) { //@TODO translate between arrays and tensors less?
        const lastReward = rewardCalculator.calcLastReward(observation);
        if (this.lastObservationArray !== null) { //@TODO maybe train in batches instead of every action?
            const predictedRewardsByAction = tf.tidy(() => {
                const observationTensor = tf.tensor(this.lastObservationArray, [1, 5, 5]);
                const predictedRewardsByAction = model.predictOnBatch(observationTensor);
                return predictedRewardsByAction.dataSync();
            })
            const target = predictedRewardsByAction.slice();//@TODO telling it it was right about untook actions seems very bad
            target[this.lastActionIndex] = lastReward;
            const observationTensor = tf.tensor(this.lastObservationArray, [1, 5, 5]);
            const targetTensor = tf.tensor(target, [1, 4]);
            model.trainOnBatch(observationTensor, targetTensor).then((trainOnBatchResult) => {
                observationTensor.dispose();
                targetTensor.dispose();
            });
        }

        const observationArray = matrixToFlatArray(viewportConversions.convert9x9to5x5(observation.tileTypes));
        let [actionIndex, predictedRewardsByAction] = tf.tidy(() => {
            const observationTensor = tf.tensor(observationArray, [1, 5, 5]);
            const predictedRewardsByAction = model.predictOnBatch(observationTensor);
            return [predictedRewardsByAction.argMax(1).dataSync(), predictedRewardsByAction.dataSync()];
        })

        let actionWasRandom = false;

        //epsilon greedy policy
        if (Math.random() < 0.05) {
            actionIndex = Math.floor(Math.random() * 4); //@TODO don't hard code
            actionWasRandom = true;
        }

        const action = actions[actionIndex];

        if (settings.renderingEnabled) {
            renderActionResponse({
                weights: predictedRewardsByAction,
                wasRandom: actionWasRandom
            });
            if (lastReward !== null) {
                renderReward(lastReward)
            }
        }

        this.lastObservationArray = observationArray;
        this.lastActionIndex = actionIndex;

        return action;
    }

    clearBrain() {
        alert('not implemented for this agent'); //@TODO
        // agent = new Agent(numberOfStates, actions.length);
        rewardCalculator = new RewardCalculator();
    }

    exportBrain() {
        alert('not implemented for this agent'); //@TODO
        // return agent.saveToJson();
    }
}
