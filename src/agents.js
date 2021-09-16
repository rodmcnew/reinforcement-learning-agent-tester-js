import LookAhead9x3 from './modules/agent-hand-programmed-look-ahead/LookAhead9x3'
// import DeepQNetwork from './modules/agent-deep-q-scratch-built/DeepQNetwork'
import TabularSARSA from './modules/agent-tabular-sarsa/TabularSARSA'
import DeepQNetworkTensorFlow from './modules/agent-deep-q-network-tensor-flow'
import DeepQNetwork from './modules/agent-deep-q-scratch-built/DeepQNetwork'
export default [
    // {
    //     name: DeepQNetworkTensorFlow.getName(),
    //     class: DeepQNetworkTensorFlow
    // },
    {
        name: DeepQNetwork.getName(),
        class: DeepQNetwork
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
];
