import {
    Network,
    InputLayer,
    HiddenLayer,
    OutputLayer,
    Linear,
    LeakyRelu,
    AdamOptimizer,
} from 'layerganza'
// } from '../../../layerganza'//@TODO and rm symlink too (cd src/modules; ln -s ../../../layerganza/lib/cjs/ layerganza)
export default function (inputCount, hiddenCount, outputCount) {
    return new Network(
        [
            new InputLayer(inputCount),
            new HiddenLayer(hiddenCount, new LeakyRelu(), new AdamOptimizer()),
            new OutputLayer(outputCount, new Linear(), new AdamOptimizer())
        ],
    );
}
