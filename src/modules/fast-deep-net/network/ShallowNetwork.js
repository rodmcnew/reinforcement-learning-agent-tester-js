// import InputLayer from '../layer/InputLayer'
// import OutputLayer from '../layer/OutputLayer'
//
// export default class ShallowNetwork {
//     constructor(inputCount, outputCount, activationFunction, learningRate) {
//         this.inputLayer = new InputLayer(inputCount);
//         this.outputLayer = new OutputLayer(outputCount, this.inputLayer, activationFunction, learningRate);
//     }
//
//     learnFromTrainingSet(inputs, targetOutputs) {
//         this.inputLayer.feedForward(inputs);
//         var outputs = this.outputLayer.feedForward();
//
//         this.outputLayer.backPropagateCalculateErrorGradient(targetOutputs);
//         this.outputLayer.backPropagateOptimize();
//
//         return outputs;
//     }
// }
