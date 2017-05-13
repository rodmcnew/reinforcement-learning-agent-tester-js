import LogisticSigmoid from '../activation-function/LogisticSigmoid'
import InputLayer from '../layer/InputLayer'
import HiddenLayer from '../layer/HiddenLayer'
import OutputLayer from '../layer/OutputLayer'

export default class DeepNetwork {
    constructor(layerConfig) {
        this.inputLayer = new InputLayer(layerConfig[0].size);

        if (layerConfig.length !== 3) {
            throw new Error('Having more or less than 1 hidden layer is not yet supported.')
        }

        var hiddenConfig = layerConfig[1];
        this.hiddenLayer = new HiddenLayer(
            hiddenConfig.size, this.inputLayer, hiddenConfig.activationFunction, hiddenConfig.learningRate
        );

        var outputConfig = layerConfig[2];
        this.outputLayer = new OutputLayer(
            outputConfig.size, this.hiddenLayer, outputConfig.activationFunction, outputConfig.learningRate
        );
        this.hiddenLayer.setOutputLayer(this.outputLayer);
    }

    invoke(inputs) {
        this.inputLayer.feedForward(inputs);
        this.hiddenLayer.feedForward();
        return this.outputLayer.feedForward();
    }

    learn(targetOutputs) {
        this.outputLayer.backPropagateCalculateErrorGradient(targetOutputs);
        this.hiddenLayer.backPropagateCalculateErrorGradient();
        this.outputLayer.backPropagateOptimize();
        this.hiddenLayer.backPropagateOptimize();
    }
}
