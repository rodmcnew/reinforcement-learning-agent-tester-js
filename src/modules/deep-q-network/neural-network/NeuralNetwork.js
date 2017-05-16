import DeepNetwork from '../../fast-deep-net/network/DeepNetwork'
import Linear from '../../fast-deep-net/activation-function/Linear'
import LeakyRelu from '../../fast-deep-net/activation-function/LeakyRelu'
export default function (inputCount, hiddenCount, outputCount) {
    return new DeepNetwork(
        [
            { //Input layer
                size: inputCount
            },
            { //Hidden layer
                size: hiddenCount,
                activationFunction: new LeakyRelu(),
                learningRate: 0.01
            },
            { //Output layer
                size: outputCount,
                activationFunction: new Linear(),
                learningRate: 0.01
            }
        ],
    );
}
