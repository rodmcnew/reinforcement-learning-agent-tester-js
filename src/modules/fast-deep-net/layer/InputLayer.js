export default class InputLayer {
    constructor(nodeCount) {
        this.nodeCount = nodeCount;
        this.outputs = new Float64Array(nodeCount);//@TODO new array not really used?
    }

    feedForward(inputs) {
        this.outputs = inputs;
    }
}
