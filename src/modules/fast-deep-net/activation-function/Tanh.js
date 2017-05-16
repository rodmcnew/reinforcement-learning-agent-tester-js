export default class Tanh {
    xToY(x) {
        return Math.tanh(x);
    }

    yToSlope(y) {
        return 1 - y * y;
    }
}
