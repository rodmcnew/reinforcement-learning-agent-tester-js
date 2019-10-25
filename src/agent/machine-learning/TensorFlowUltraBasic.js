import { matrixToFlatArray } from '../../environment/nestedFloatMatrixMath'
import { actions } from '../../environment'
import RewardCalculator from './helper/RewardCalculator'
import * as tf from '@tensorflow/tfjs';
let rewardCalculator = new RewardCalculator();

const model = tf.sequential();
model.add(tf.layers.flatten({ inputShape: [9, 9] }));
model.add(tf.layers.dense({ units: 64, activation: 'relu' })); //@TODO make leaky?
model.add(tf.layers.dense({ units: 4, activation: 'softmax' }));
model.compile({
    optimizer: 'adam',//'rmsprop'
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
});

export default class TensorFlowUltraBasic {
    constructor() {
        rewardCalculator = new RewardCalculator();
        this.lastObservationTensor = null;
        this.lastActionIndex = null;
    }

    static getName() {
        return 'ReinforcementLearning? - TensorFlowUltraBasicOneStepRewardPredictor - 9x9 - ranked ???';
    }

    static getDescription() {
        return '';
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        const lastReward = rewardCalculator.calcLastReward(observation);
        if (this.lastObservationTensor !== null) {
            const target = [null, null, null, null];//@TODO is this right? is it interpreting these as zeros which would be bad?
            target[this.lastActionIndex] = lastReward;
            model.trainOnBatch(this.lastObservationTensor, tf.tensor(target, [1, 4]));
        }

        const data = Array.from(matrixToFlatArray(observation.tileTypes));//@TODO? 

        const tensor = tf.tensor(data, [1, 9, 9]);
        const actionPredictedValues = model.predictOnBatch(tensor);
        const actionIndex = actionPredictedValues.argMax(1).dataSync();
        this.lastObservationTensor = tensor;
        this.lastActionIndex = actionIndex;

        // if (settings.renderingEnabled) { //@TODO
        //     renderActionResponse(actionResponse);
        //     if (lastReward !== null) {
        //         renderReward(lastReward)
        //     }
        // }

        let action = actions[actionIndex];

        this._lastScore = observation.score;

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
