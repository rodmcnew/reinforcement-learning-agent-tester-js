import DeepNetwork from '../../fast-deep-net/network/DeepNetwork'
import Tanh from '../../fast-deep-net/activation-function/Tanh'
// import LogisticSigmoid from '../../fast-deep-net/activation-function/LogisticSigmoid'
import Linear from '../../fast-deep-net/activation-function/Linear'
// import LeakyRelu from '../../fast-deep-net/activation-function/LeakyRelu'
export default function (inputCount, hiddenCount, outputCount) {
    return new DeepNetwork(
        [
            { //Input layer
                size: inputCount
            },
            { //Hidden layer
                size: hiddenCount,
                activationFunction: new Tanh(),
                learningRate: 0.5
            },
            { //Output layer
                size: outputCount,
                activationFunction: new Tanh(),
                learningRate: 0.5
            }
        ],
    );
}
