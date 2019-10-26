// import {createMatrix} from '../nestedFloatMatrixMath'
// import {config} from './index'
//
// const rayVectors = [
//     {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1},
//     {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: -1, y: -1},
// ];
// const adjacentDirections = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];
//
// export function getVisibleTiles(state) {
//     const visibles = createMatrix([config.size[0], config.size[1]], 0);
//
//     //We can always see the tile we are currently in
//     visibles[state.position[0]][state.position[1]] = 1;
//
//     //@TODO performance could be improved by not processing original position for each ray vector
//     if (state.tileTypes[state.position[0]][state.position[1]] === 0) {
//         //Not already in red tile so do ray tracing
//         for (let rayVectorsI = 0, len = rayVectors.length; rayVectorsI < len; rayVectorsI++) {
//             const direction = rayVectors[rayVectorsI];
//             let x = state.position[0];
//             let y = state.position[1];
//             let lastWasWall = false;
//             while (typeof state.tileTypes[x] !== 'undefined' && typeof state.tileTypes[x][y] !== 'undefined' && !lastWasWall) { //@todo Don't call this func to increase performance
//                 visibles[x][y] = 1;
//                 lastWasWall = state.tileTypes[x][y] !== 0;
//                 x = x + direction.x;
//                 y = y + direction.y;
//                 if (lastWasWall) {
//                     continue; //Don't look adjacent if we are already in a wall.
//                 }
//                 for (let adjacentDirectionsI = 0, len = adjacentDirections.length; adjacentDirectionsI < len; adjacentDirectionsI++) {
//                     const subDirection = adjacentDirections[adjacentDirectionsI];
//                     let xAdj = x + subDirection.x;
//                     let yAdj = y + subDirection.y;
//                     if (typeof state.tileTypes[xAdj] !== 'undefined' && typeof state.tileTypes[xAdj][yAdj] !== 'undefined') {
//                         visibles[xAdj][yAdj] = 1;
//                     }
//                 }
//             }
//         }
//     } else {
//         //Already in red tile so can only see one adjacent in each direction since our vision is "clouded"
//         //@TODO this processes the same squares many times
//         for (let rayVectorsI = 0, len = rayVectors.length; rayVectorsI < len; rayVectorsI++) {
//             const subDirection = rayVectors[rayVectorsI];
//             const checkPosition = [state.position[0] + subDirection.x, state.position[1] + subDirection.y];
//             if (typeof state.tileTypes[checkPosition[0]] !== 'undefined' && typeof state.tileTypes[checkPosition[0]][checkPosition[1]] !== 'undefined') {
//                 visibles[checkPosition[0]][checkPosition[1]] = 1;
//             }
//         }
//     }
//
//     return visibles;
// }
