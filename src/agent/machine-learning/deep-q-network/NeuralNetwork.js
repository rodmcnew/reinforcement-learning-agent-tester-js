import Matrix from './Matrix'
import * as matrixMath from './matrixMath'

function buildMatrices(inputSize, outputSize, hiddenLayerSizes) {
    var matrices = [];

    matrices[0] = new Matrix(hiddenLayerSizes[0], inputSize); //Hidden layer weights
    matrixMath.fillWithRandomValues(matrices[0], 0, 0.01);

    matrices[1] = new Matrix(hiddenLayerSizes[0], 1, 0, 0.01); //Hidden layer biases

    matrices[2] = new Matrix(outputSize, hiddenLayerSizes[0]); //Output layer weights
    matrixMath.fillWithRandomValues(matrices[2], 0, 0.01);

    matrices[3] = new Matrix(outputSize, 1, 0, 0.01); //Output layer biases

    return matrices;
}

/**
 * These output matrix's are reused which gives a 15% performance boost by avoiding array
 * instantiation.
 *
 * @param outputSize
 * @param hiddenLayerSizes
 * @returns {[*,*,*,*,*,*]}
 */
function buildOuts(outputSize, hiddenLayerSizes) {
    return [
        null,//Gets replaced by the input matrix later
        new Matrix(hiddenLayerSizes[0], 1),
        new Matrix(hiddenLayerSizes[0], 1),
        new Matrix(hiddenLayerSizes[0], 1),
        new Matrix(outputSize, 1),
        new Matrix(outputSize, 1),
    ];
}

export default class NeuralNetwork {
    constructor(inputSize, outputSize, hiddenLayerSizes) {
        this.forward = this.forward.bind(this);
        this.backPropagate = this.backPropagate.bind(this);

        if (hiddenLayerSizes.length > 1) {
            throw new Error('Multiple hidden layers are not yet supported.');
        }

        this._matrices = buildMatrices(inputSize, outputSize, hiddenLayerSizes);
        this.outs = buildOuts(outputSize, hiddenLayerSizes);
    }

    forward(input) {
        this.outs[0] = input;

        matrixMath.mul(this._matrices[0], this.outs[0], this.outs[1]);
        matrixMath.add(this.outs[1], this._matrices[1], this.outs[2]);
        matrixMath.tanH(this.outs[2], this.outs[3]);
        matrixMath.mul(this._matrices[2], this.outs[3], this.outs[4]);
        matrixMath.add(this.outs[4], this._matrices[3], this.outs[5]);

        return this.outs[5];
    }

    backPropagate(outputError, alpha) {

        //Clear old deltas before starting. Re-using the same matrices (Float64Arrays) provides a 15% performance gain
        matrixMath.clearDeltasInArrayOfMatrices(this.outs);

        this.outs[5].dw = outputError.w;

        matrixMath.backwardAdd(this.outs[4], this._matrices[3], this.outs[5]);
        matrixMath.backwardMul(this._matrices[2], this.outs[3], this.outs[4]);
        matrixMath.backwardTanH(this.outs[2], this.outs[3]);
        matrixMath.backwardAdd(this.outs[1], this._matrices[1], this.outs[2]);
        matrixMath.backwardMul(this._matrices[0], this.outs[0], this.outs[1]);

        matrixMath.updateValuesFromDeltasInArrayOfMatrices(this._matrices, alpha);
    }

    toJSON() {
        return {matrices: this._matrices};
    }

    fromJSON(json) {
        for (var matricesI = 0, matricesCount = json.matrices.length; matricesI < matricesCount; matricesI++) {
            this._matrices[matricesI].fromJSON(json.matrices[matricesI]);
        }
    }
}
