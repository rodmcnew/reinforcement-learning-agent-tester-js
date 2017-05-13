import arrayShuffle from '../math/arrayShuffle'

function log(inputs, targetOutputs, outputs) {
    // console.log('inputs:', inputs);
    console.log(
        'error: ' + Math.round((outputs[0] - targetOutputs[0]) * 100) + '%',
        'output: ' + Math.round((outputs[0]) * 100) + '%',
        'targetOutput ' + Math.round((targetOutputs[0]) * 100) + '%',
    );
}

export default function shuffleTrain(neuralNetwork, trainingSets, maxEpochs) {
    for (var epoch = 0; epoch < maxEpochs; epoch++) {
        trainingSets = arrayShuffle(trainingSets);

        for (var setI = 0, setCount = trainingSets.length; setI < setCount; setI++) {
            var set = trainingSets[setI];
            // console.log(set);
            var outputs = neuralNetwork.invoke(set[0]);
            neuralNetwork.learn(set[1]);
            log(set[0],set[1],outputs);
        }
    }
}
