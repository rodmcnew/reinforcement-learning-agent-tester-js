import LookAhead9x3 from './modules/agent-hand-programmed-look-ahead/LookAhead9x3'
// import DeepQNetwork from './modules/agent-deep-q-scratch-built/DeepQNetwork'
import TabularSARSA from './modules/agent-tabular-sarsa/TabularSARSA'
import DeepQNetworkTensorFlow from './modules/agent-deep-q-network-tensor-flow'
import DeepQNetwork from './modules/agent-deep-q-scratch-built/DeepQNetwork'
export const agents = [
    // {
    //     name: DeepQNetworkTensorFlow.getName(),
    //     class: DeepQNetworkTensorFlow
    // },
    {
        name: DeepQNetwork.getName(),
        instance: new DeepQNetwork(),
        class: DeepQNetwork
    },
    {
        name: TabularSARSA.getName(),
        instance: new TabularSARSA(),
        class: TabularSARSA,
        description: TabularSARSA.getDescription()
    },
    {
        name: LookAhead9x3.getName(),
        instance: new LookAhead9x3(),
        class: LookAhead9x3
    },
];
