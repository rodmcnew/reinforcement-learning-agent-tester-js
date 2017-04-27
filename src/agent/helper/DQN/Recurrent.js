import Matrix from './Matrix'
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

var copyMatrix = function (b) {
    var a = new Matrix(b.n, b.d);
    a.setFrom(b.w);
    return a;
};

var copyNet = function (net) {
    // nets are (k,v) pairs with k = string key, v = Matrix()
    var new_net = {};
    for (var p in net) {
        if (net.hasOwnProperty(p)) {
            new_net[p] = copyMatrix(net[p]);
        }
    }
    return new_net;
};

// var updateMatrix = function (m, alpha) {
//     // updates in place
//     for (var i = 0, n = m.n * m.d; i < n; i++) {
//         if (m.dw[i] !== 0) {
//             m.w[i] += -alpha * m.dw[i];
//             m.dw[i] = 0;
//         }
//     }
// };

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
            net[p] = new Matrix(1, 1); // not proud of this
            net[p].fromJSON(j[p]);
        }
    }
    return net;
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

// more utils
// R.updateMatrix = updateMatrix;
// R.updateNet = updateNet;
R.copyMatrix = copyMatrix;
R.copyNet = copyNet;
R.netToJSON = netToJSON;
R.netFromJSON = netFromJSON;

export const Recurrent = R;
