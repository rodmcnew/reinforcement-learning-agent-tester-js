import DeepNetwork from 'layer-oriented-deep-learning-network-js/lib/network/DeepNetwork'
import Linear from 'layer-oriented-deep-learning-network-js/lib/activation-function/Linear'
import LeakyRelu from 'layer-oriented-deep-learning-network-js/lib/activation-function/LeakyRelu'
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
