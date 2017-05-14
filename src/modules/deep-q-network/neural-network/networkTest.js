// import NeuralNetwork from './NeuralNetwork'
// import shuffleTrain from '../../fast-deep-net/trainer/shuffleTrain'
//
// // var trainingSets = [//left, down, right
// //     [[0, 0, 0], [-0.01, 0.09, -0.01]],
// //     [[0, 0, 1], [-0.01, 0.09, -0.51]],
// //     [[0, 1, 0], [-0.01, -0.41, -0.01]],
// //     [[0, 1, 1], [-0.01, -0.41, -0.51]],
// //     [[1, 0, 0], [-0.51, 0.09, -0.01]],
// //     [[1, 0, 1], [-0.51, 0.09, -0.51]],
// //     [[1, 1, 0], [-0.51, -0.41, -0.01]],
// //     [[1, 1, 1], [-0.51, -0.41, -0.51]],
// // ];
// // var network = new NeuralNetwork(3, 3, 2);
// // shuffleTrain(network, trainingSets, 1000);
//
// var trainingSets = [//left, down, right
//     [[0, 0], [0, 0]],
//     [[0, 1], [1, 1]],
//     [[1, 0], [1, 1]],
//     [[1, 1], [0, 1]],
// ];
// var network = new NeuralNetwork(2, 4, 2);
// shuffleTrain(network, trainingSets, 2000);