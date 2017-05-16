import ShallowNetwork from './ShallowNetwork'
import LeakyRelu from '../activation-function/LeakyRelu'
import shuffleTrain from '../trainer/shuffleTrain'
export default function () {
    var network = new ShallowNetwork(2, 3, new LeakyRelu(), 0.1);

    var trainingSets = [//Outputs: [AND, GreaterThan, LessThan]
        [[0, 0], [0, 0, 0]],
        [[0, 1], [0, 0, 1]],
        [[1, 0], [0, 1, 0]],
        [[1, 1], [1, 1, 1]],
    ];

    shuffleTrain(network, trainingSets, 1000);
}
