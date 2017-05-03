// import LookAheadIn9x3Viewport from './agent/hand-programmed/LookAheadIn9x3Viewport'
// import LookAheadIn3x2Viewport from './agent/hand-programmed/LookAheadIn3x2Viewport'
import AlwaysMoveStraightDown from './agent/hand-programmed/AlwaysMoveStraightDown'
import LookAheadIn5x3Viewport from './agent/hand-programmed/LookAheadIn5x3Viewport'
import DeepQNetwork_OneStep from './agent/machine-learning/DeepQNetwork_OneStep'
import TabularSARSA_5x3Viewport from './agent/machine-learning/TabularSARSA_5x3Viewport'

export default [
    {
        name: 'MachineLearning - TabularSARSA_5x3Viewport_32768States - PreTrained - ranked 210',
        class: TabularSARSA_5x3Viewport,
        ticksPerInterval: 20000 //This agent runs fast but needs many games to learn
    },
    {
        name: 'MachineLearning - DeepQNetwork_OneStep - PreTrained - ranked 226',
        class: DeepQNetwork_OneStep
    },
    // {
    //     name: 'HandProgrammed - LookAheadIn9x3Viewport - ranked 87',
    //     class: LookAheadIn9x3Viewport
    // },
    {
        name: 'HandProgrammed - LookAheadIn5x3Viewport - ranked 214',
        class: LookAheadIn5x3Viewport
    },
    // {
    //     name: 'HandProgrammed - LookAheadIn3x2Viewport - ranked 74',
    //     class: LookAheadIn3x2Viewport
    // },
    {
        name: 'HandProgrammed - AlwaysMoveStraightDown - ranked (-31)',
        class: AlwaysMoveStraightDown
    },
];
