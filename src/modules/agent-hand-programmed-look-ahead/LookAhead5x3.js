// import { getActionViaFeelers } from './helper/feeler'

// const feelerPaths = [
//     ['a', 'a', 's', 's'],
//     ['a', 's', 'a', 's'],
//     ['a', 's', 's'],
//     ['s', 'a', 's'],

//     ['s', 's'],

//     ['d', 'd', 's', 's'],
//     ['d', 's', 'd', 's'],
//     ['d', 's', 's'],
//     ['s', 'd', 's'],
// ];

// export default class LookAhead5x3 {
//     static getName() {
//         return 'HandProgrammed - LookAhead - 5x3 - ranked 247'
//     }

//     /**
//      *
//      * @param {AgentObservation} observation
//      * @return {string} action code
//      */
//     getAction(lastAction, lastReward, observationMatrix) {
//         return getActionViaFeelers(observationMatrix, feelerPaths, null);
//     }

//     newGame() { }
// }
