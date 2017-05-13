import {gaussRandom} from '../math/random'

function assertIsNumber(value, valueLabel) {
    if (typeof value === 'undefined') {
        throw new Error(valueLabel + ' is undefined');
    }
    if (isNaN(value)) {
        throw new Error(valueLabel + ' is NaN');
    }
}

function logWeightUpdate(description, update, oldValue, newValue, gradient) {
    console.log(
        'Updating neuron ' + description + ' by: ' + update,
        'weight:' + oldValue + '->' + newValue,
        'gradient:' + gradient
    )
}

export default class OutputLayer {
    constructor(nodeCount, inputLayer, activationFunction, learningRate) {
        this.nodeCount = nodeCount;
        this.inputCount = inputLayer.nodeCount;
        this.inputNodeCount = this.inputCount + 1;//Add 1 for the bias node
        this.weights = new Float64Array(nodeCount * this.inputNodeCount);
        for (var weightI = 0, weightLen = this.weights.length; weightI < weightLen; weightI++) {
            this.weights[weightI] = gaussRandom();
        }
        this.outputs = new Float64Array(nodeCount);
        this.activationFunction = activationFunction.invoke;
        this.activationFunctionDerivative = activationFunction.invokeDerivative;
        this.errorGradients = new Float64Array(nodeCount);
        this.learningRate = learningRate;
        this.inputLayer = inputLayer;
        // this.inputs = new Float64Array(inputLayer.nodeCount + 1)
    }

    feedForward() {
        this.inputs = this.inputLayer.outputs;

        // if (this.inputs.length == this.inputCount)
        // // console.log('b', this.inputs);
        //     this.inputs[this.inputCount] = 1;//Add a bias node that always outputs "1"
        // // console.log('a', this.inputs);

        for (var neuronI = 0; neuronI < this.nodeCount; neuronI++) {
            var sum = 0;
            for (var inputI = 0; inputI < this.inputCount; inputI++) {
                assertIsNumber(this.inputs[inputI], 'Input');

                sum += this.inputs[inputI] * this.weights[neuronI * this.inputNodeCount + inputI];
                // console.log('adder', inputI, this.inputs[inputI], this.weights[neuronI * this.inputNodeCount + inputI])
            }
            // console.log('adder', inputI, 1, this.weights[neuronI * this.inputNodeCount + inputI]);
            sum += this.weights[neuronI * this.inputNodeCount + this.inputCount];//Bias node that always inputs "1"

            this.outputs[neuronI] = this.activationFunction(sum);

            assertIsNumber(this.outputs[neuronI], 'Neuron output');
        }

        return this.outputs;
    }

    backPropagateCalculateErrorGradient(targetOutputs) {
        for (var neuronI = 0; neuronI < this.nodeCount; neuronI++) {
            this.errorGradients[neuronI] = this.outputs[neuronI] - targetOutputs[neuronI];
            // console.log(neuronI, this.errorGradients[neuronI], this.outputs[neuronI], targetOutputs[neuronI]);
            assertIsNumber(this.errorGradients[neuronI], 'Error gradient');
        }
    }

    backPropagateOptimize() {
        for (var neuronI = 0; neuronI < this.nodeCount; neuronI++) {
            for (var inputI = 0; inputI < this.inputCount; inputI++) {
                // logWeightUpdate(
                //     neuronI + ':' + inputI,
                //     -this.learningRate * this.inputs[inputI] * this.errorGradients[neuronI],
                //     this.weights[neuronI * this.inputCount + inputI],
                //     this.weights[neuronI * this.inputCount + inputI] -
                //     this.learningRate * this.inputs[inputI] * this.errorGradients[neuronI],
                //     this.errorGradients[neuronI]
                // );

                this.weights[neuronI * this.inputCount + inputI] -=
                    this.learningRate * this.inputs[inputI] * this.errorGradients[neuronI];

                assertIsNumber(this.weights[neuronI * this.inputCount + inputI], 'Weight');
            }

            this.weights[neuronI * this.inputCount + this.inputCount] -= //Do the bias node weight
                this.learningRate * this.errorGradients[neuronI];

            assertIsNumber(this.weights[neuronI * this.inputCount + this.inputCount], 'Bias weight');
        }
    }
}
