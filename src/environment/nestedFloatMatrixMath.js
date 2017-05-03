/**
 * Creates a matrix out of nested Float64Arrays and returns it
 *
 * @param {Array} dimensions [xLength, yLength]
 * @returns {Array}
 */
export function createMatrix(dimensions) {
    let matrix = [];

    for (let i = 0; i < dimensions[0]; i++) {
        matrix[i] = new Float64Array(dimensions[1]);
    }

    return matrix;
}

/**
 * Shifts and trims the given matrix by the given amounts. Is useful for creating viewport output.
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
    var shiftX = shiftVector[0];
    var shiftY = shiftVector[1];
    var fromXLen = matrix.length;
    var fromYLen = matrix[0].length;
    var xLen = fromXLen - trimVector[0] * 2;
    var yLen = fromYLen - trimVector[1] * 2;
    if (outputMatrix.length !== xLen || outputMatrix[0].length !== yLen) {
        throw new Error('Output matrix has the wrong dimensions. ' +
            'Expected:'+xLen+'x'+yLen+' ,' +
            'Actual:'+outputMatrix.length+'x'+outputMatrix[0].length);
    }

    for (var x = 0; x < xLen; x++) {
        var fromX = x + shiftX;
        var fromXRow = matrix[fromX];
        var toXRow = outputMatrix[x];
        for (var y = 0; y < yLen; y++) {
            var fromY = y + shiftY;
            if (fromX >= 0 && fromX < fromXLen && fromY >= 0 && fromY < fromYLen) {
                toXRow[y] = fromXRow[y + shiftY]
            } else {
                toXRow[y] = defaultValue;
            }
        }
    }

    //Thought this was may be faster but it was not
    // for (var x = 0; x < xLen; x++) {
    //     for (var y = 0; y < yLen; y++) {
    //         if (x + shiftX >= 0 && x + shiftX < fromXLen && y + shiftY >= 0 && y + shiftY < fromYLen) {
    //             outputMatrix[x][y] = matrix[x + shiftX][y + shiftY]
    //         } else {
    //             outputMatrix[x][y] = defaultValue;
    //         }
    //     }
    // }
}

/**
 * Converts a matrix made of nested arrays to a single flat array and returns it
 *
 * @param {Array} matrix
 * @returns {Float64Array}
 */
export function matrixToFlatArray(matrix) {
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
