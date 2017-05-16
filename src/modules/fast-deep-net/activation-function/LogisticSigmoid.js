export default class LogisticSigmoid {
    xToY(x) {
        return 1 / (1 + Math.exp(-x));
    }

    yToSlope(y) {
        return y * (1 - y);
    }
}
