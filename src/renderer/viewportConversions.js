import {shiftAndTrimMatrix, createMatrix} from '../tensorTools'

export function convert9x9to5x5(matrix) {
    return shiftAndTrimMatrix(matrix, [0, -1], 1, [2, 2])
}

var convert9x9to5x3OutputMatrix = createMatrix([5,3],0);//Object pool to increase performance
export function convert9x9to5x3(matrix) {
    shiftAndTrimMatrix(matrix, [0, -1], 1, [2, 3], convert9x9to5x3OutputMatrix);
    return convert9x9to5x3OutputMatrix;
}

var convert9x9to5x2OutputMatrix = createMatrix([5,2],0);//Object pool to increase performance
export function convert9x9to5x2(matrix) {
    shiftAndTrimMatrix(matrix, [0, -0], 1, [2, 2], convert9x9to5x2OutputMatrix);
    return convert9x9to5x2OutputMatrix;
}


var convert9x9to3x2OutputMatrix = createMatrix([3,2],0);//Object pool to increase performance
export function convert9x9to3x2(matrix) {
    shiftAndTrimMatrix(matrix, [0, -0], 1, [3, 2], convert9x9to3x2OutputMatrix);
    return convert9x9to3x2OutputMatrix;
}
