import OutputLayer from './OutputLayer'

export default class HiddenLayer extends OutputLayer {
    setOutputLayer(outputLayer) {
        this.outputLayer = outputLayer;
    }

    backPropagateCalculateErrorGradient() {
        for (var neuronI = 0; neuronI < this.nodeCount; neuronI++) {
            var errorWithRespectToOutput = 0;
            for (var outputI = 0; outputI < this.outputLayer.nodeCount; outputI++) {
                // console.log('ggg', neuronI, outputI, this.outputLayer.errorGradients[outputI]
                //     , this.outputLayer.weights[outputI * this.outputLayer.inputCount + neuronI]);
                errorWithRespectToOutput += this.outputLayer.errorGradients[outputI]
                    * this.outputLayer.weights[outputI * this.outputLayer.inputCount + neuronI]
            }

            this.errorGradients[neuronI] = errorWithRespectToOutput * this.activationFunctionDerivative(this.outputs[neuronI]);
        }
    }
}

// export default class HiddenLayer {//@TODO add bias
//     constructor(nodeCount, inputLayer, activationFunction, learningRate) {//@TODO set this.inputs each forward pass
//         this.nodeCount = nodeCount;
//         this.inputCount = inputLayer.nodeCount;
//         this.inputs = inputLayer.outputs;
//         this.weights = new Float64Array(nodeCount * inputLayer.nodeCount);
//         for (var weightI = 0, weightLen = this.weights.length; weightI < weightLen; weightI++) {
//             this.weights[weightI] = gaussRandom();
//         }
//         this.outputs = new Float64Array(nodeCount);
//         this.outputLayer = null;
//         this.activationFunction = activationFunction.invoke;
//         this.activationFunctionDerivative = activationFunction.invokeDerivative;
//         this.errorGradients = new Float64Array(nodeCount);
//         this.learningRate = learningRate;
//     }
//
//     setOutputLayer(outputLayer) {
//         this.outputLayer = outputLayer;
//     }
//
//     feedForward() {
//         for (var neuronI = 0; neuronI < this.nodeCount; neuronI++) {
//             var sum = 0;
//             for (var inputI = 0; inputI < this.inputCount; inputI++) {
//                 sum += this.inputs[inputI] * this.weights[neuronI * this.inputCount + inputI]
//             }
//             this.outputs[neuronI] = this.activationFunction(sum);
//         }
//     }
//
//     backPropagateCalculateErrorGradient() {
//         for (var neuronI = 0; neuronI < this.nodeCount; neuronI++) {
//             var errorWithRespectToOutput = 0;
//             for (var outputI = 0; outputI < this.outputLayer.nodeCount; outputI++) {
//                 // console.log('ggg', neuronI, outputI, this.outputLayer.errorGradients[outputI]
//                 //     , this.outputLayer.weights[outputI * this.outputLayer.inputCount + neuronI]);
//                 errorWithRespectToOutput += this.outputLayer.errorGradients[outputI]
//                     * this.outputLayer.weights[outputI * this.outputLayer.inputCount + neuronI]
//             }
//
//             this.errorGradients[neuronI] = errorWithRespectToOutput * this.activationFunctionDerivative(this.outputs[neuronI]);
//         }
//     }
//
//     backPropagateOptimize() {
//         for (var neuronI = 0; neuronI < this.nodeCount; neuronI++) {
//             for (var inputI = 0; inputI < this.inputCount; inputI++) {
//                 this.weights[neuronI * this.inputCount + inputI] -=
//                     this.learningRate * this.inputs[inputI] * this.errorGradients[neuronI]
//             }
//         }
//     }
// }
