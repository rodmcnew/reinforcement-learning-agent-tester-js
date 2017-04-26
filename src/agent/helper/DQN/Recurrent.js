import Mat from './Mat'
import Graph from './Graph'
import gaussRandom from './gaussRandom'

// Utility fun
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        throw new Error(message);
    }
}

var randi = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};
var randn = function (mu, std) {
    return mu + gaussRandom() * std;
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
