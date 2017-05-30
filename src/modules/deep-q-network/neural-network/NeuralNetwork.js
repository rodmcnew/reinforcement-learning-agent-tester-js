import DeepNetwork from 'layerganza/lib/network/DeepNetwork'
import InputLayer from 'layerganza/lib/layer/InputLayer'
import HiddenLayer from 'layerganza/lib/layer/HiddenLayer'
import OutputLayer from 'layerganza/lib/layer/OutputLayer'
import Linear from 'layerganza/lib/activation-function/Linear'
import LeakyRelu from 'layerganza/lib/activation-function/LeakyRelu'
import StochasticGradientDescent from 'layerganza/lib/optimizer/StochasticGradientDescent'
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
