import LookAhead9x3 from './modules/agent-hand-programmed-look-ahead/LookAhead9x3'
import LookAhead5x3 from './modules/agent-hand-programmed-look-ahead/LookAhead5x3'
import DeepQNetwork from './modules/agent-deep-q-scratch-built/DeepQNetwork'
import NaiveTensorFlow from './modules/agent-naive-tensor-flow/NaiveTensorFlow'
import TabularSARSA from './modules/agent-tabular-sarsa/TabularSARSA'
import DeepQNetworkTensorFlow from './modules/agent-deep-q-network-tensor-flow'
export default [
    {
        name: DeepQNetwork.getName(),
        class: DeepQNetwork
    },
    {
        name: DeepQNetworkTensorFlow.getName(),
        class: DeepQNetworkTensorFlow
    },
    {
        name: NaiveTensorFlow.getName(),
        description: NaiveTensorFlow.getDescription(),
        class: NaiveTensorFlow
    },
    {
        class: TabularSARSA,
        name: TabularSARSA.getName(),
        description: TabularSARSA.getDescription(),
        ticksPerInterval: 20000 //This agent runs fast but needs many games to learn
    },
    {
        name: LookAhead9x3.getName(),
        class: LookAhead9x3
    },
    {
        name: LookAhead5x3.getName(),
        class: LookAhead5x3
    },
];
