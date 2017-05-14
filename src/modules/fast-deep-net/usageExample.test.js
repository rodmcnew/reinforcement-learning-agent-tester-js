// import DeepNetwork from './network/DeepNetwork'
// import LogisticSigmoid from './activation-function/LogisticSigmoid'
// import LeakyRelu from './activation-function/LogisticSigmoid'
// import ShallowNetwork from './network/ShallowNetwork'
// import shuffleTrain from './trainer/shuffleTrain'
// import '../deep-q-network/neural-network/networkTest'

// var network = new ShallowNetwork(2, 1, new LogisticSigmoid(), 0.5);
// var trainingSets = [ //"AND Gate" Behaviour
//     [[0, 0], [0]],
//     [[0, 1], [0]],
//     [[1, 0], [0]],
//     [[1, 1], [1]],
// ];

// var network = new DeepNetwork(
//     [
//         { //Input layer
//             size: 2
//         },
//         { //Hidden layer
//             size: 4,
//             activationFunction: new LeakyRelu(),
//             learningRate: 0.1
//         },
//         { //Output layer
//             size: 1,
//             activationFunction: new LogisticSigmoid(),
//             learningRate: 0.5
//         }
//     ],
// );
// var trainingSets = [ //"XOR Gate" Behaviour
//     [[0, 0], [0]],
//     [[0, 1], [1]],
//     [[1, 0], [1]],
//     [[1, 1], [0]],
// ];

// var network = new DeepNetwork(2, 5, 1);

// console.log('hi');
//
// it('tworks!', () => {
//     // shuffleTrain(network, trainingSets, 20000);
//     // shuffleTrain(network, trainingSets, 10);
// });
