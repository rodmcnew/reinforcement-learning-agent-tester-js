import arrayShuffle from '../math/arrayShuffle'

function log(epoch, setNumber, inputs, targetOutputs, outputs) {
    // console.log('inputs:', inputs);
    var errors = new Array(outputs.length);
    for (var i = 0, len = outputs.length; i < len; i++) {
        errors[i] = (targetOutputs[i] - outputs[i]).toFixed(4);
    }
    console.log(
        epoch + ':' + setNumber,
        'errors', errors,
        // 'input', inputs, 'targetOutput', targetOutputs, 'output', outputs
    );
}

export default function shuffleTrain(neuralNetwork, trainingSets, maxEpochs) {
    for (var epoch = 0; epoch < maxEpochs; epoch++) {
        trainingSets = arrayShuffle(trainingSets);

        for (var setI = 0, setCount = trainingSets.length; setI < setCount; setI++) {

            var set = trainingSets[setI];

            var outputs = neuralNetwork.invoke(set[0]);

            neuralNetwork.learn(set[1]);

            log(epoch, setI, set[0], set[1], outputs);
        }
    }
}
