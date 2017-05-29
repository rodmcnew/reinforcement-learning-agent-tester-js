import DeepNetwork from 'layer-oriented-deep-learning-network-js/lib/network/DeepNetwork'
import InputLayer from 'layer-oriented-deep-learning-network-js/lib/layer/InputLayer'
import HiddenLayer from 'layer-oriented-deep-learning-network-js/lib/layer/HiddenLayer'
import OutputLayer from 'layer-oriented-deep-learning-network-js/lib/layer/OutputLayer'
import Linear from 'layer-oriented-deep-learning-network-js/lib/activation-function/Linear'
import LeakyRelu from 'layer-oriented-deep-learning-network-js/lib/activation-function/LeakyRelu'
import StochasticGradientDescent from 'layer-oriented-deep-learning-network-js/lib/optimizer/StochasticGradientDescent'
export default function (inputCount, hiddenCount, outputCount) {
    const learningRate = 0.01;
    return new DeepNetwork(
        [
            new InputLayer(inputCount),
            new HiddenLayer(hiddenCount, new LeakyRelu(), new StochasticGradientDescent(learningRate)),
            new OutputLayer(outputCount, new Linear(), new StochasticGradientDescent(learningRate))
        ],
    );
}
