export default class Tanh {
    invoke(x) {
        return Math.tanh(x);
    }

    invokeDerivative(y) {
        return 1 - y * y;
    }
}
