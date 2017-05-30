import {
    Network,
    InputLayer,
    HiddenLayer,
    OutputLayer,
    Linear,
    LeakyRelu,
    AdamOptimizer,
} from 'layerganza'
export default function (inputCount, hiddenCount, outputCount) {
    return new Network(
        [
            new InputLayer(inputCount),
            new HiddenLayer(hiddenCount, new LeakyRelu(), new AdamOptimizer()),
            new OutputLayer(outputCount, new Linear(), new AdamOptimizer())
        ],
    );
}
