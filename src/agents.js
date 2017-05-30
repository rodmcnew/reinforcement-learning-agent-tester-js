import LookAhead from './agent/hand-programmed/LookAhead'
import LookAheadIn5x3Viewport from './agent/hand-programmed/LookAheadIn5x3Viewport'
import DeepQNetwork from './agent/machine-learning/DeepQNetwork'
import TabularSARSA from './agent/machine-learning/TabularSARSA'
export default [
    {
        name: 'ReinforcementLearning - DeepQNetwork - ranked - 227',
        class: DeepQNetwork
    },
    {
        class: TabularSARSA,
        name: TabularSARSA.getName(),
        description: TabularSARSA.getDescription(),
        ticksPerInterval: 20000 //This agent runs fast but needs many games to learn
    },
    {
        name: 'HandProgrammed - LookAhead - ranked 255',
        class: LookAhead
    },
    {
        name: 'HandProgrammed - LookAheadIn5x3Viewport - ranked 247',
        class: LookAheadIn5x3Viewport
    },
];
