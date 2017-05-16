// import {gaussRandom} from '../math/random'
// import {assertIsNumber} from '../assert/assert'

// function logWeightUpdate(description, update, oldValue, newValue, gradient) {
//     console.log(
//         'Updating weight ' + description + ' by: ' + update,
//         'weight:' + oldValue + '->' + newValue,
//         'gradient:' + gradient
//     )
// }

export default class OutputLayer {
    constructor(nodeCount, inputLayer, activationFunction, learningRate) {
        this.nodeCount = nodeCount;
        this.inputCount = inputLayer.nodeCount;
        this.inputNodeCount = this.inputCount + 1;//Add 1 for the bias node
        this.weights = new Float64Array(nodeCount * this.inputNodeCount);
        for (var weightI = 0, weightLen = this.weights.length; weightI < weightLen; weightI++) {
            this.weights[weightI] = Math.random() - 0.5; //gaussRandom(); //@TODO do better?
        }
        this.outputs = new Float64Array(nodeCount);
        this.activationFunction = activationFunction.xToY;
        this.activationFunctionDerivative = activationFunction.yToSlope;
        this.errorGradients = new Float64Array(nodeCount);
        this.learningRate = learningRate;
        this.inputLayer = inputLayer;
    }

    feedForward() {
        this.inputs = this.inputLayer.outputs;

        //Defining these locally speeds up the loop below by reducing object property access
        var inputNodeCount = this.inputNodeCount;
        var weights = this.weights;
        var inputs = this.inputs;
        var activationFunction = this.activationFunction;
        var outputs = this.outputs;
        var nodeCount = this.nodeCount;
        var inputCount = this.inputCount;

        for (var neuronI = 0; neuronI < nodeCount; neuronI++) {
            var sum = 0;
            for (var inputI = 0; inputI < inputCount; inputI++) {
                // assertIsNumber(this.inputs[inputI], 'Input');
                sum += inputs[inputI] * weights[neuronI * inputNodeCount + inputI];
            }
            sum += weights[neuronI * inputNodeCount + inputCount];//Bias node that always inputs "1"

            outputs[neuronI] = activationFunction(sum);

            // assertIsNumber(this.outputs[neuronI], 'Neuron output');
        }

        return outputs;
    }

    backPropagateCalculateErrorGradient(targetOutputs) {
        //Defining these locally speeds up the loop below by reducing object property access
        var nodeCount = this.nodeCount;
        var errorGradients = this.errorGradients;
        var outputs = this.outputs;
        var activationFunctionDerivative = this.activationFunctionDerivative;

        for (var neuronI = 0; neuronI < nodeCount; neuronI++) {
            errorGradients[neuronI] = (outputs[neuronI] - targetOutputs[neuronI])
                * activationFunctionDerivative(outputs[neuronI]);
            // assertIsNumber(this.errorGradients[neuronI], 'Error gradient');
        }
    }

    backPropagateOptimize() {
        //Defining these locally speeds up the loop below by reducing object property access
        var inputNodeCount = this.inputNodeCount;
        var weights = this.weights;
        var nodeCount = this.nodeCount;
        var inputCount = this.inputCount;
        var inputs = this.inputs;
        var learningRate = this.learningRate;
        var errorGradients = this.errorGradients;

        for (var neuronI = 0; neuronI < nodeCount; neuronI++) {
            for (var inputI = 0; inputI < inputCount; inputI++) {
                // logWeightUpdate(
                //     neuronI + ':' + inputI,
                //     -this.learningRate * this.inputs[inputI] * this.errorGradients[neuronI],
                //     this.weights[neuronI * this.inputCount + inputI],
                //     this.weights[neuronI * this.inputCount + inputI] -
                //     this.learningRate * this.inputs[inputI] * this.errorGradients[neuronI],
                //     this.errorGradients[neuronI]
                // );

                weights[neuronI * inputNodeCount + inputI] -=
                    learningRate * inputs[inputI] * errorGradients[neuronI];

                // assertIsNumber(this.weights[neuronI * this.inputNodeCount + inputI], 'Weight');
            }

            // logWeightUpdate(
            //     neuronI + ':' + inputI,
            //     -this.learningRate * this.errorGradients[neuronI],
            //     this.weights[neuronI * this.inputCount + inputI],
            //     this.weights[neuronI * this.inputCount + inputI] -
            //     this.learningRate * this.errorGradients[neuronI],
            //     this.errorGradients[neuronI]
            // );
            weights[neuronI * inputNodeCount + inputCount] -= //Do the bias node weight
                learningRate * errorGradients[neuronI];

            // assertIsNumber(this.weights[neuronI * this.inputNodeCount + this.inputCount], 'Bias weight');
        }
    }
}
