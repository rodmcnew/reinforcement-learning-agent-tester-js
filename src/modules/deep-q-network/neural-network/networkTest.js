import NeuralNetwork from './NeuralNetwork'
import shuffleTrain from 'layer-oriented-deep-learning-network-js/lib/trainer/shuffleTrain'

export function networkTest(){
    var trainingSets = [//left, down, right
        [[0, 0, 0], [-0.01, 0.09, -0.01]],
        [[0, 0, 1], [-0.01, 0.09, -0.51]],
        [[0, 1, 0], [-0.01, -0.41, -0.01]],
        [[0, 1, 1], [-0.01, -0.41, -0.51]],
        [[1, 0, 0], [-0.51, 0.09, -0.01]],
        [[1, 0, 1], [-0.51, 0.09, -0.51]],
        [[1, 1, 0], [-0.51, -0.41, -0.01]],
        [[1, 1, 1], [-0.51, -0.41, -0.51]],
    ];
    var network = new NeuralNetwork(3, 100, 3);
    shuffleTrain(network, trainingSets, 1000);
}

// networkTest();

// import shallowNetworkTest from '../../fast-deep-net/network/shallowNetworkTest'
// shallowNetworkTest();
// import deepNetworkTest from '../../fast-deep-net/network/deepNetworkTest'
// deepNetworkTest();
