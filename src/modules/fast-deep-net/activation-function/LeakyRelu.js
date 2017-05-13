export default class LeakyRelu {
    invoke(x) {
        if (x > 0) {
            return x
        } else {
            return 0.01 * x
        }
    }

    invokeDerivative(y) {
        if (y > 0) {
            return 1
        } else {
            return 0.01; //@TODO is this correct for Y input?
        }
    }
}
