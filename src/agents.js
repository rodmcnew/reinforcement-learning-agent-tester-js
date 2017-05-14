// import LookAheadIn9x3Viewport from './agent/hand-programmed/LookAheadIn9x3Viewport'
// import LookAheadIn3x2Viewport from './agent/hand-programmed/LookAheadIn3x2Viewport'
// import AlwaysMoveStraightDown from './agent/hand-programmed/AlwaysMoveStraightDown'
import LookAheadIn5x3Viewport from './agent/hand-programmed/LookAheadIn5x3Viewport'
import MatrixDeepQNetwork from './agent/machine-learning/MatrixDeepQNetwork'
import TabularSARSA from './agent/machine-learning/TabularSARSA'

export default [
    {
        name: 'ReinforcementLearning - MatrixDeepQNetwork - PreTrained - ranked 228',
        class: MatrixDeepQNetwork
    },
    {
        class: TabularSARSA,
        name: TabularSARSA.getName(),
        description: TabularSARSA.getDescription(),
        ticksPerInterval: 20000 //This agent runs fast but needs many games to learn
    },
    // {
    //     name: 'HandProgrammed - LookAheadIn9x3Viewport - ranked 87',
    //     class: LookAheadIn9x3Viewport
    // },
    {
        name: 'HandProgrammed - LookAheadIn5x3Viewport - ranked 247',
        class: LookAheadIn5x3Viewport
    },
    // {
    //     name: 'HandProgrammed - LookAheadIn3x2Viewport - ranked 74',
    //     class: LookAheadIn3x2Viewport
    // },
    // {
    //     name: 'HandProgrammed - AlwaysMoveStraightDown - ranked (-31)',
    //     class: AlwaysMoveStraightDown
    // },
];
