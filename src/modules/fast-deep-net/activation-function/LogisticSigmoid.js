export default class LogisticSigmoid {
    invoke(x) {
        return 1 / (1 + Math.exp(-x));
    }

    invokeDerivative(y) {
        return y * (1 - y);
    }
}
