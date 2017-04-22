import {shiftAndTrimMatrix} from '../../tensorTools'

export function convert9x9to5x5(matrix){
    return shiftAndTrimMatrix(matrix, [0, -1], 1, [2, 2])
}