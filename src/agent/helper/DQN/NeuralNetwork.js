import {fillWithRandomValues} from './matrixOperations'
import Matrix from './Matrix'
import * as MatrixMath from './matrixOperations'

function buildMatrices(inputSize, outputSize, hiddenLayerSize) {
    var matrices = [];

    matrices[0] = new Matrix(hiddenLayerSize, inputSize); //Hidden layer weights
    fillWithRandomValues(matrices[0], 0, 0.01);

    matrices[1] = new Matrix(hiddenLayerSize, 1, 0, 0.01); //Hidden layer biases

    matrices[2] = new Matrix(outputSize, hiddenLayerSize); //Output layer weights
    fillWithRandomValues(matrices[2], 0, 0.01);

    matrices[3] = new Matrix(outputSize, 1, 0, 0.01); //Output layer biases

    return matrices;
}

export default class NeuralNetwork {
    constructor(inputSize, outputSize, hiddenLayerSize) {
        this.forward = this.forward.bind(this);
        this.backPropagate = this.backPropagate.bind(this);

        this._matrices = buildMatrices(inputSize, outputSize, hiddenLayerSize);

        this.outs = [
            null,//Gets replaced by the input matrix later
            new Matrix(hiddenLayerSize, 1),
            new Matrix(hiddenLayerSize, 1),
            new Matrix(hiddenLayerSize, 1),
            new Matrix(outputSize, 1),
            new Matrix(outputSize, 1),
        ];
    }

    forward(input) {
        this.outs[0] = input;

        MatrixMath.mul(this._matrices[0], this.outs[0], this.outs[1]);
        MatrixMath.add(this.outs[1], this._matrices[1], this.outs[2]);
        MatrixMath.tanH(this.outs[2], this.outs[3]);
        MatrixMath.mul(this._matrices[2], this.outs[3], this.outs[4]);
        MatrixMath.add(this.outs[4], this._matrices[3], this.outs[5]);

        return this.outs[5];
    }

    backPropagate(outputError, alpha) {

        //Clear old deltas before starting. Re-using the same matrices (Float64Arrays) provides a 15% performance gain
        MatrixMath.clearDeltasInArrayOfMatrices(this.outs);

        this.outs[5].dw = outputError.w;

        MatrixMath.backwardAdd(this.outs[4], this._matrices[3], this.outs[5]);
        MatrixMath.backwardMul(this._matrices[2], this.outs[3], this.outs[4]);
        MatrixMath.backwardTanH(this.outs[2], this.outs[3]);
        MatrixMath.backwardAdd(this.outs[1], this._matrices[1], this.outs[2]);
        MatrixMath.backwardMul(this._matrices[0], this.outs[0], this.outs[1]);

        MatrixMath.updateValuesFromDeltasInArrayOfMatrices(this._matrices, alpha);
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
