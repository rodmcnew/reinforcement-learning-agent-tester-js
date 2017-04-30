export function createMatrix(dimensions, defaultValue) {//@TODO take dimensions instead of size
    let matrix = [];

    for (let i0 = 0; i0 < dimensions[0]; i0++) {
        matrix[i0] = new Float64Array(dimensions[1]);
        for (let i1 = 0; i1 < dimensions[1]; i1++) {
            matrix[i0][i1] = defaultValue;
        }
    }

    return matrix;
}

export function getMatrixDimensions(matrix) {
    return [matrix.length, matrix[0].length];
}

export function matrixPositionExists(matrix, x, y) {
    return typeof matrix[x] !== 'undefined' && typeof matrix[x][y] !== 'undefined';
}

export function forEachValueInMatrix(matrix, callback) {
    const dimensions = getMatrixDimensions(matrix);
    for (let x = 0; x < dimensions[0]; x++) {
        for (let y = 0; y < dimensions[1]; y++) {
            callback(x, y, matrix[x][y]);
        }
    }
}

export function shiftMatrix(matrix, vector, defaultValue) {
    const dimensions = getMatrixDimensions(matrix);
    const newMatrix = createMatrix(dimensions, defaultValue);

    for (let x = 0; x < dimensions[0]; x++) {
        for (let y = 0; y < dimensions[1]; y++) {
            const fromX = x + vector[0];
            const fromY = y + vector[1];
            if (fromX >= 0 && fromX < dimensions[0] && fromY >= 0 && fromY < dimensions[0]) {
                newMatrix[x][y] = matrix[fromX][fromY]
            }
        }
    }

    return newMatrix;
}

/**
 *
 * @param matrix
 * @param shiftVector
 * @param defaultValue
 * @param trimVector
 * @param outputMatrix Output is written here rather than returned because instantiating arrays is slow in JS
 * @returns {*}
 */
export function shiftAndTrimMatrix(matrix, shiftVector, defaultValue, trimVector, outputMatrix) {
    shiftVector = [shiftVector[0] + trimVector[0], shiftVector[1] + trimVector[1]];
    const dimensions = [matrix.length, matrix[0].length];
    const newDimensions = [dimensions[0] - trimVector[0] * 2, dimensions[1] - trimVector[1] * 2];

    // if (!outputMatrix) {//@TODO throw error if out matrix is wrong size
    //     outputMatrix = createMatrix(newDimensions, defaultValue);
    // }

    var shiftX = shiftVector[0];
    var shiftY = shiftVector[1];
    var xLen = newDimensions[0];
    var yLen = newDimensions[1];
    var fromXLen=dimensions[0];
    var fromYLen=dimensions[1];
    for (var x = 0; x < xLen; x++) {
        var fromX = x + shiftX;
        for (var y = 0; y < yLen; y++) {
            var fromY = y + shiftY;
            if (fromX >= 0 && fromX < fromXLen && fromY >= 0 && fromY < fromYLen) {
                outputMatrix[x][y] = matrix[fromX][fromY]
            } else {
                outputMatrix[x][y] = defaultValue;
            }
        }
    }

    // return outputMatrix;//@TODO remove the bc-support code
}

export function matrixToVector(matrix) {
    const xLen = matrix.length;
    const yLen = matrix[0].length;
    var vectorI = 0;
    var vector = new Float64Array(xLen * yLen);
    for (var xI = 0; xI < xLen; xI++) {
        for (var yI = 0; yI < yLen; yI++) {
            vector[vectorI] = matrix[xI][yI];
            vectorI++;
        }
    }
    return vector;
}