// const maxAbsReward = 100;
// export default class RewardCalculator {
//     construct() {
//         this._lastScore = null;
//     }

//     calcLastReward(observation) {
//         let reward = null;
//         if (typeof observation.score === 'undefined') {
//             // throw new Error();
//             observation.score = 0;//@TODO fix this. stop it from happening during new games
//         }
//         // console.log(this._lastScore, observation.score);
//         if (this._lastScore !== null && observation.score !== null) {
//             //Scale reward to between -1 and 1 to not blow up the NN
//             reward = (observation.score - this._lastScore) / maxAbsReward;
//         }
//         this._lastScore = observation.score;
//         if (!isFinite(reward)) {
//             reward = 0;//@TODO fix this. stop it from happening during new games
//         }
//         return reward;
//     }
// }
