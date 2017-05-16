import Linear from '../activation-function/Linear'
import LeakyRelu from '../activation-function/LeakyRelu'
import DeepNetwork from './DeepNetwork'
import shuffleTrain from '../trainer/shuffleTrain'
var network = new DeepNetwork(
    [
        { //Input layer
            size: 2
        },
        { //Hidden layer
            size: 100,
            activationFunction: new LeakyRelu(),
            learningRate: 0.1
        },
        { //Output layer
            size: 6,
            activationFunction: new Linear(),
            learningRate: 0.1
        }
    ],
);


export default function () {
    var trainingSets = [//Outputs: [XOR, OR, AND, GreaterThan, LessThan, NotBoth]
        [[0, 0], [0, 0, 0, 0, 0, 1]],
        [[0, 1], [1, 1, 0, 0, 1, 0]],
        [[1, 0], [1, 1, 0, 1, 0, 0]],
        [[1, 1], [0, 1, 1, 0, 0, 0]],
    ];
    shuffleTrain(network, trainingSets, 100);
}
