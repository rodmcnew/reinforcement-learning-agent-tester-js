import {shiftAndTrimMatrix, createMatrix} from './nestedFloatMatrixMath'

// export function convert9x9to5x5(matrix) {
//     return shiftAndTrimMatrix(matrix, [0, -1], 1, [2, 2])
// }

var convert9x9to7x5OutputMatrix = createMatrix([7, 5]);//Object pool to increase performance
export function convert9x9to7x5(matrix) {
    shiftAndTrimMatrix(matrix, [0, -1], 1, [1, 2], convert9x9to7x5OutputMatrix);
    return convert9x9to7x5OutputMatrix;
}

var convert9x9to5x5OutputMatrix = createMatrix([5, 5]);//Object pool to increase performance
export function convert9x9to5x5(matrix) {
    shiftAndTrimMatrix(matrix, [0, -1], 1, [2, 2], convert9x9to5x5OutputMatrix);
    return convert9x9to5x5OutputMatrix;
}

var convert9x9to5x3OutputMatrix = createMatrix([5, 3]);//Object pool to increase performance
export function convert9x9to5x3(matrix) {
    shiftAndTrimMatrix(matrix, [0, -1], 1, [2, 3], convert9x9to5x3OutputMatrix);
    return convert9x9to5x3OutputMatrix;
}

// var convert9x9to5x2OutputMatrix = createMatrix([5, 2]);//Object pool to increase performance
// export function convert9x9to5x2(matrix) {
//     shiftAndTrimMatrix(matrix, [0, -0], 1, [2, 2], convert9x9to5x2OutputMatrix);
//     return convert9x9to5x2OutputMatrix;
// }

// var convert9x9to3x2OutputMatrix = createMatrix([3, 2]);//Object pool to increase performance
// export function convert9x9to3x2(matrix) {
//     shiftAndTrimMatrix(matrix, [0, -0], 1, [3, 2], convert9x9to3x2OutputMatrix);
//     return convert9x9to3x2OutputMatrix;
// }
