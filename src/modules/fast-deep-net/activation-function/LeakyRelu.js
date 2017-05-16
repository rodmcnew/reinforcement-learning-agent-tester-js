export default class LeakyRelu {
    xToY(x) {
        if (x > 0) {
            return x
        } else {
            return 0.01 * x
        }
    }

    yToSlope(y) {
        if (y > 0) {
            return 1
        } else {
            return 0.01;
        }
    }
}
