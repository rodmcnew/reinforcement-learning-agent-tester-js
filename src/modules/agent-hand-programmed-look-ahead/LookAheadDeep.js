// import {getActionViaFeelers} from './helper/feeler'

// const feelerPaths = [ //Warning the paths below may not include all possibilities

//     ['s', 's', 's'],

//     ////

//     ['s', 'a', 's', 's'],
//     ['s', 'a', 's', 'a', 's'],
//     ['s', 'a', 's', 'a', 'a', 's'],

//     ['s', 'a', 'a', 's', 's'],
//     ['s', 'a', 'a', 's', 'a', 's'],
//     ['s', 'a', 'a', 'a', 's', 's'],

//     ['s', 's', 'a', 's'],
//     ['s', 's', 'a', 'a', 's'],
//     ['s', 's', 'a', 'a', 'a', 's'],

//     ['a', 's', 's', 's'],
//     ['a', 's', 's', 'a', 's'],
//     ['a', 's', 's', 'a', 'a', 's'],

//     ['a', 's', 'a', 's', 's'],
//     ['a', 's', 'a', 's', 'a', 's'],

//     ['a', 'a', 's', 's', 's'],
//     ['a', 'a', 's', 'a', 's', 's'],
//     ['a', 'a', 's', 'a', 's', 'a', 's'],

//     ['a', 'a', 'a', 's', 's', 's'],

//     ////

//     ['s', 'd', 's', 's'],
//     ['s', 'd', 's', 'd', 's'],
//     ['s', 'd', 's', 'd', 'd', 's'],

//     ['s', 'd', 'd', 's', 's'],
//     ['s', 'd', 'd', 's', 'd', 's'],
//     ['s', 'd', 'd', 'd', 's', 's'],

//     ['s', 's', 'd', 's'],
//     ['s', 's', 'd', 'd', 's'],
//     ['s', 's', 'd', 'd', 'd', 's'],

//     ['d', 's', 's', 's'],
//     ['d', 's', 's', 'd', 's'],
//     ['d', 's', 's', 'd', 'd', 's'],

//     ['d', 's', 'd', 's', 's'],
//     ['d', 's', 'd', 's', 'd', 's'],

//     ['d', 'd', 's', 's', 's'],
//     ['d', 'd', 's', 'd', 's', 's'],
//     ['d', 'd', 's', 'd', 's', 'd', 's'],

//     ['d', 'd', 'd', 's', 's', 's'],

//     ////

//     ['a', 's', 's', 'd', 's'],
//     ['a', 'a', 's', 's', 'd', 's'],
//     ['a', 'a', 's', 's', 'd', 'd', 's'],
//     ['a', 'a', 's', 's', 'd', 'd', 'd', 's'],
//     ['a', 'a', 'a', 's', 's', 'd', 's'],
//     ['a', 'a', 'a', 's', 's', 'd', 'd', 's'],
//     ['a', 'a', 'a', 's', 's', 'd', 'd', 'd', 's'],

//     ////

//     ['d', 's', 's', 'a', 's'],
//     ['d', 'd', 's', 's', 'a', 's'],
//     ['d', 'd', 's', 's', 'a', 'a', 's'],
//     ['d', 'd', 's', 's', 'a', 'a', 'a', 's'],
//     ['d', 'd', 'd', 's', 's', 'a', 's'],
//     ['d', 'd', 'd', 's', 's', 'a', 'a', 's'],
//     ['d', 'd', 'd', 's', 's', 'a', 'a', 'a', 's'],
// ];

// export default class LookAheadDeep {
//     constructor() {
//         this._state = {lastAction: null};
//     }

//     /**
//      *
//      * @param {AgentObservation} observation
//      * @return {string} action code
//      */
//     getAction(observation) {
//         let action = getActionViaFeelers(observation, feelerPaths, this._state.lastAction);

//         this._state.lastAction = action;

//         return action;
//     }
// }
