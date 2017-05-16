import InputLayer from '../layer/InputLayer'
import OutputLayer from '../layer/OutputLayer'

export default class ShallowNetwork {
    constructor(inputCount, outputCount, activationFunction, learningRate) {
        this.inputLayer = new InputLayer(inputCount);
        this.outputLayer = new OutputLayer(outputCount, this.inputLayer, activationFunction, learningRate);
    }

    invoke(inputs) {
        this.inputLayer.feedForward(inputs);
        return this.outputLayer.feedForward();
    }

    learn(targetOutputs) {
        this.outputLayer.backPropagateCalculateErrorGradient(targetOutputs);
        this.outputLayer.backPropagateOptimize();
    }
}
