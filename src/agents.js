import LookAhead from './agent/hand-programmed/LookAhead'
import LookAheadIn5x3Viewport from './agent/hand-programmed/LookAheadIn5x3Viewport'
import DeepQNetwork from './agent/machine-learning/DeepQNetwork'
import TensorFlowUltraBasic from './agent/machine-learning/TensorFlowUltraBasic'
import TabularSARSA from './agent/machine-learning/TabularSARSA'
export default [
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
        name: TensorFlowUltraBasic.getName(),
        class: TensorFlowUltraBasic
    },
    {
        name: 'HandProgrammed - LookAhead - 9x3 - ranked 255',
        class: LookAhead
    },
    {
        name: 'HandProgrammed - LookAhead - 5x3 - ranked 247',
        class: LookAheadIn5x3Viewport
    },
];
