// Utility fun
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        throw new Error(message);
    }
}

// Random numbers utils
var return_v = false;
var v_val = 0.0;
var gaussRandom = function () {
    if (return_v) {
        return_v = false;
        return v_val;
    }
    var u = 2 * Math.random() - 1;
    var v = 2 * Math.random() - 1;
    var r = u * u + v * v;
    if (r == 0 || r > 1) return gaussRandom();
    var c = Math.sqrt(-2 * Math.log(r) / r);
    v_val = v * c; // cache this
    return_v = true;
    return u * c;
};
var randi = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};
var randn = function (mu, std) {
    return mu + gaussRandom() * std;
};

// Mat holds a matrix
var Mat = function (n, d) {
    // n is number of rows d is number of columns
    this.n = n;
    this.d = d;
    this.w = new Float64Array(n * d);
    this.dw = new Float64Array(n * d);
};
Mat.prototype = {
    setFrom: function (arr) {
        for (var i = 0, n = arr.length; i < n; i++) {
            this.w[i] = arr[i];
        }
    },
    toJSON: function () {
        var json = {};
        json['n'] = this.n;
        json['d'] = this.d;
        json['w'] = this.w;
        return json;
    },
    fromJSON: function (json) {
        this.n = json.n;
        this.d = json.d;
        this.w = new Float64Array(this.n * this.d);
        this.dw = new Float64Array(this.n * this.d);
        for (var i = 0, n = this.n * this.d; i < n; i++) {
            this.w[i] = json.w[i]; // copy over weights
        }
    }
};

var copyMat = function (b) {
    var a = new Mat(b.n, b.d);
    a.setFrom(b.w);
    return a;
};

var copyNet = function (net) {
    // nets are (k,v) pairs with k = string key, v = Mat()
    var new_net = {};
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            new_net[p] = copyMat(net[p]);
        }
    }
    return new_net;
};

var updateMat = function (m, alpha) {
    // updates in place
    for (var i = 0, n = m.n * m.d; i < n; i++) {
        if (m.dw[i] !== 0) {
            m.w[i] += -alpha * m.dw[i];
            m.dw[i] = 0;
        }
    }
};

var updateNet = function (net, alpha) {
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            updateMat(net[p], alpha);
        }
    }
};

var netToJSON = function (net) {
    var j = {};
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            j[p] = net[p].toJSON();
        }
    }
    return j;
};
var netFromJSON = function (j) {
    var net = {};
    for (var p in j) {
        if (j.hasOwnProperty(p)) {
            net[p] = new Mat(1, 1); // not proud of this
            net[p].fromJSON(j[p]);
        }
    }
    return net;
};

// return Mat but filled with random numbers from gaussian
var RandMat = function (n, d, mu, std) {
    var m = new Mat(n, d);
    fillRandn(m, mu, std);
    //fillRand(m,-std,std); // kind of :P
    return m;
};

// Mat utils
// fill matrix with random gaussian numbers
var fillRandn = function (m, mu, std) {
    for (var i = 0, n = m.w.length; i < n; i++) {
        m.w[i] = randn(mu, std);
    }
};

// Transformer definitions
var Graph = function (needs_backprop) {
    this.needs_backprop = needs_backprop;

    // this will store a list of functions that perform backprop,
    // in their forward pass order. So in backprop we will go
    // backwards and evoke each one
    this.backprop = [];
};
Graph.prototype = {
    backward: function () {
        for (var i = this.backprop.length - 1; i >= 0; i--) {
            this.backprop[i](); // tick!
        }
    },
    rowPluck: function (m, ix) {
        // pluck a row of m with index ix and return it as col vector
        assert(ix >= 0 && ix < m.n);
        var d = m.d;
        var out = new Mat(d, 1);
        for (var i = 0, n = d; i < n; i++) {
            out.w[i] = m.w[d * ix + i];
        } // copy over the data

        if (this.needs_backprop) {
            var backward = function () {
                for (var i = 0, n = d; i < n; i++) {
                    m.dw[d * ix + i] += out.dw[i];
                }
            };
            this.backprop.push(backward);
        }
        return out;
    },
    tanh: function (m) {
        // tanh nonlinearity
        var out = new Mat(m.n, m.d);
        var n = m.w.length;
        for (var i = 0; i < n; i++) {
            out.w[i] = Math.tanh(m.w[i]);
        }

        if (this.needs_backprop) {
            var backward = function () {
                for (var i = 0; i < n; i++) {
                    // grad for z = tanh(x) is (1 - z^2)
                    var mwi = out.w[i];
                    m.dw[i] += (1.0 - mwi * mwi) * out.dw[i];
                }
            };
            this.backprop.push(backward);
        }
        return out;
    },
    sigmoid: function (m) {
        // sigmoid nonlinearity
        var out = new Mat(m.n, m.d);
        var n = m.w.length;
        for (var i = 0; i < n; i++) {
            out.w[i] = sig(m.w[i]);
        }

        if (this.needs_backprop) {
            var backward = function () {
                for (var i = 0; i < n; i++) {
                    // grad for z = tanh(x) is (1 - z^2)
                    var mwi = out.w[i];
                    m.dw[i] += mwi * (1.0 - mwi) * out.dw[i];
                }
            };
            this.backprop.push(backward);
        }
        return out;
    },
    mul: function (m1, m2) {
        // multiply matrices m1 * m2
        assert(m1.d === m2.n, 'matmul dimensions misaligned');

        var n = m1.n;
        var d = m2.d;
        var out = new Mat(n, d);
        for (var i = 0; i < m1.n; i++) { // loop over rows of m1
            for (var j = 0; j < m2.d; j++) { // loop over cols of m2
                var dot = 0.0;
                for (var k = 0; k < m1.d; k++) { // dot product loop
                    dot += m1.w[m1.d * i + k] * m2.w[m2.d * k + j];
                }
                out.w[d * i + j] = dot;
            }
        }

        if (this.needs_backprop) {
            var backwardMul = function () {
                for (var i = 0; i < m1.n; i++) { // loop over rows of m1
                    for (var k = 0; k < m1.d; k++) { // dot product loop
                        for (var j = 0; j < m2.d; j++) { // loop over cols of m2
                            var b = out.dw[d * i + j];
                            m1.dw[m1.d * i + k] += m2.w[m2.d * k + j] * b;
                            m2.dw[m2.d * k + j] += m1.w[m1.d * i + k] * b;
                        }
                    }
                }
            };
            this.backprop.push(backwardMul);
        }
        return out;
    },
    add: function (m1, m2) {
        assert(m1.w.length === m2.w.length);

        var out = new Mat(m1.n, m1.d);
        for (var i = 0, n = m1.w.length; i < n; i++) {
            out.w[i] = m1.w[i] + m2.w[i];
        }
        if (this.needs_backprop) {
            var backward = function () {
                for (var i = 0, n = m1.w.length; i < n; i++) {
                    m1.dw[i] += out.dw[i];
                    m2.dw[i] += out.dw[i];
                }
            };
            this.backprop.push(backward);
        }
        return out;
    },
    dot: function (m1, m2) {
        // m1 m2 are both column vectors
        assert(m1.w.length === m2.w.length);
        var out = new Mat(1, 1);
        var dot = 0.0;
        for (var i = 0, n = m1.w.length; i < n; i++) {
            dot += m1.w[i] * m2.w[i];
        }
        out.w[0] = dot;
        if (this.needs_backprop) {
            var backward = function () {
                for (var i = 0, n = m1.w.length; i < n; i++) {
                    m1.dw[i] += m2.w[i] * out.dw[0];
                    m2.dw[i] += m1.w[i] * out.dw[0];
                }
            };
            this.backprop.push(backward);
        }
        return out;
    },
    eltmul: function (m1, m2) {
        assert(m1.w.length === m2.w.length);

        var out = new Mat(m1.n, m1.d);
        for (var i = 0, n = m1.w.length; i < n; i++) {
            out.w[i] = m1.w[i] * m2.w[i];
        }
        if (this.needs_backprop) {
            var backward = function () {
                for (var i = 0, n = m1.w.length; i < n; i++) {
                    m1.dw[i] += m2.w[i] * out.dw[i];
                    m2.dw[i] += m1.w[i] * out.dw[i];
                }
            };
            this.backprop.push(backward);
        }
        return out;
    },
};

var sig = function (x) {
    // helper function for computing sigmoid
    return 1.0 / (1 + Math.exp(-x));
};

var maxi = function (w) {
    // argmax of array w
    var maxv = w[0];
    var maxix = 0;
    for (var i = 1, n = w.length; i < n; i++) {
        var v = w[i];
        if (v > maxv) {
            maxix = i;
            maxv = v;
        }
    }
    return maxix;
};

// various utils
var R = {};
R.assert = assert;
R.maxi = maxi;
R.randi = randi;
R.randn = randn;
// classes
R.Mat = Mat;
R.RandMat = RandMat;
// more utils
R.updateMat = updateMat;
R.updateNet = updateNet;
R.copyMat = copyMat;
R.copyNet = copyNet;
R.netToJSON = netToJSON;
R.netFromJSON = netFromJSON;
// optimization
R.Graph = Graph;


export const Recurrent = R;