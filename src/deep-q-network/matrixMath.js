// Matrix utils
// fill matrix with random gaussian numbers
import {gaussRandom} from './random'

export function tanH(m, out) {
    // tanh nonlinearity
    // var out = new Matrix(m.n, m.d);
    if (out.n !== m.n || out.d !== m.d) {
        throw new Error('Out should be ' + m.n + ' by ' + m.d + ' but is ' + out.n + ' by ' + out.d);
    }

    var n = m.n;
    for (var i = 0; i < n; i++) {
        out.w[i] = Math.tanh(m.w[i]);
    }

    // return out;
}

export function backwardTanH(m, out) {
    for (var i = 0; i < m.n; i++) {
        // grad for z = tanh(x) is (1 - z^2)
        var mwi = out.w[i];
        m.dw[i] += (1.0 - mwi * mwi) * out.dw[i];
    }
}

/**
 *
 * Note: Re-using matrices (Float64Arrays) provides a 15% performance gain. This why "out" exists rather than returning
 *
 * @param m1
 * @param m2
 * @param out
 */
export function mul(m1, m2, out) {//4.7 Float64Array
    if (m1.d !== m2.n) {
        throw new Error(m1.d + '!==' + m2.n);
    } else if (out.n !== m1.n || out.d !== m2.d) {
        throw new Error('Out should be ' + m1.n + ' by ' + m2.d + ' but is ' + out.n + ' by ' + out.d);
    }

    // var out = new Matrix(n, d);
    for (var i = 0; i < m1.n; i++) { // loop over rows of m1
        for (var j = 0; j < m2.d; j++) { // loop over cols of m2
            var dot = 0.0;
            for (var k = 0; k < m1.d; k++) { // dot product loop
                dot += m1.w[m1.d * i + k] * m2.w[m2.d * k + j];
            }
            out.w[m2.d * i + j] = dot;
        }
    }

    // return out;
}

export function backwardMul(m1, m2, out) {
    for (var i = 0; i < m1.n; i++) {
        for (var k = 0; k < m1.d; k++) {
            for (var j = 0; j < m2.d; j++) {
                var b = out.dw[m2.d * i + j];
                m1.dw[m1.d * i + k] += m2.w[m2.d * k + j] * b;
                m2.dw[m2.d * k + j] += m1.w[m1.d * i + k] * b;
            }
        }
    }
}

export function add(m1, m2, out) {
    if (m1.w.length !== m2.w.length) {
        throw new Error();
    }

    if (out.n !== m1.n || out.d !== m1.d) {
        throw new Error('Out should be ' + m1.n + ' by ' + m1.d + ' but is ' + out.n + ' by ' + out.d);
    }

    // var out = new Matrix(m1.n, m1.d);
    for (var i = 0, n = m1.w.length; i < n; i++) {
        out.w[i] = m1.w[i] + m2.w[i];
    }

    // return out;
}

export function backwardAdd(m1, m2, out) {
    for (var i = 0, n = m1.w.length; i < n; i++) {
        m1.dw[i] += out.dw[i];
        m2.dw[i] += out.dw[i];
    }
}


export function fillWithRandomValues(m, mu, std) {
    for (var i = 0, n = m.w.length; i < n; i++) {
        m.w[i] = mu + gaussRandom() * std;
    }
}

export function updateFromDeltas(m, alpha) {
    for (var i = 0, length = m.n * m.d; i < length; i++) {
        m.w[i] += -alpha * m.dw[i];
        m.dw[i] = 0;
    }
}

export function clearDeltasInArrayOfMatrices(matrices) {
    for (var matricesI = 0, matricesCount = matrices.length; matricesI < matricesCount; matricesI++) {
        var matrix = matrices[matricesI];
        for (var i = 0, iCount = matrix.n * matrix.d; i < iCount; i++) {
            matrix.dw[i] = 0;
        }
    }
}

export function updateValuesFromDeltasInArrayOfMatrices(matrices, alpha) {
    for (var matricesI = 0, matricesCount = matrices.length; matricesI < matricesCount; matricesI++) {
        var matrix = matrices[matricesI];
        for (var i = 0, length = matrix.n * matrix.d; i < length; i++) {
            matrix.w[i] += -alpha * matrix.dw[i];
            matrix.dw[i] = 0;
        }
    }
}
