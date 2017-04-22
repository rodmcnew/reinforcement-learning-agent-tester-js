import {config} from '../environment'

function getImmediateCosts(observation) {
    const costOneBelow = config.tileValueMap[observation.tileTypes[observation.position[0]][observation.position[1] + 1]];
    const costOneToRight = config.tileValueMap[observation.tileTypes[observation.position[0] + 1][observation.position[1]]];
    const costOneToLeft = config.tileValueMap[observation.tileTypes[observation.position[0] - 1][observation.position[1]]];
    return {
        'a': costOneToLeft,
        's': costOneBelow - config.verticalDeltaScore,
        'd': costOneToRight
    };
}

/**
 * An Agent that has a preferred lateral direction and moves that way if its less costly than moving down.
 *
 * @constructor
 */
export default class LateralWallBouncer {
    constructor() {
        this._state = {
            lateralAvoidanceDirection: 'd'
        }
    }

    /**
     *
     * @param {AgentObservation} observation
     * @return {string} action code
     */
    getAction(observation) {
        let immediateCosts = getImmediateCosts(observation);

        //If we are on the edge of the game, reverse the lateral avoidance direction
        if (observation.position[0] == config.size[0] - 1) {
            this._state.lateralAvoidanceDirection = 'a';
        } else if (observation.position[0] == 0) {
            this._state.lateralAvoidanceDirection = 'd';
        }

        let costToSide = this._state.lateralAvoidanceDirection == 'd' ? immediateCosts.d : immediateCosts.a;

        let action = 's';

        if (immediateCosts.s > costToSide) {
            action = this._state.lateralAvoidanceDirection;
        }

        return action;
    }
}
