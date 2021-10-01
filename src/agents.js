import LookAhead9x3 from './modules/agent-hand-programmed-look-ahead/LookAhead9x3'
import DeepQNetwork from './modules/agent-deep-q-scratch-built/DeepQNetwork'
import TabularSARSA from './modules/agent-tabular-sarsa/TabularSARSA'
import { renderAgentData } from './modules/lib-agent-helper/qStateRenderer';
// import DeepQNetworkTensorFlow from './modules/agent-deep-q-network-tensor-flow'
export const agents = [
    // {
    //     name: DeepQNetworkTensorFlow.getName(),
    //     class: DeepQNetworkTensorFlow
    // },
    {
        name: DeepQNetwork.getName(),
        class: DeepQNetwork,
        description: DeepQNetwork.getDescription(),
        render: renderAgentData,
    },
    {
        name: TabularSARSA.getName(),
        class: TabularSARSA,
        description: TabularSARSA.getDescription(),
        render: renderAgentData,
    },
    {
        name: LookAhead9x3.getName(),
        class: LookAhead9x3,
        description: LookAhead9x3.getDescription()
    },
];
