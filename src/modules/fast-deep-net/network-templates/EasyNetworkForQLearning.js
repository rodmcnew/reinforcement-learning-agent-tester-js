import DeepNetwork from '../network/DeepNetwork'
import Tanh from '../activation-function/Tanh'
import LogisticSigmoid from '../activation-function/LogisticSigmoid'
import Linear from '../activation-function/Linear'
import LeakyRelu from '../activation-function/LeakyRelu'
export default function (inputCount, hiddenCount, outputCount) {
    return new DeepNetwork(
        [
            { //Input layer
                size: inputCount
            },
            { //Hidden layer
                size: hiddenCount,
                activationFunction: new Tanh(),
                learningRate: 0.1
            },
            { //Output layer
                size: outputCount,
                activationFunction: new Linear(),
                learningRate: 0.1
            }
        ],
    );
}
