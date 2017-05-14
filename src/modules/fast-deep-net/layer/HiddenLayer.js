import OutputLayer from './OutputLayer'
import {assertIsNumber} from '../assert/assert'

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
            assertIsNumber(this.errorGradients[neuronI], 'Error gradient');
        }
    }
}