/**
 * An Agent that has a preferred lateral direction and moves that way if its less costly than moving down.
 *
 * @constructor
 */
export default (observation, agentState)=> {
    /**
     * Clone the previous agent state and ensure it has needed default values
     * @type {*}
     */
    agentState = Object.assign(
        {},
        {
            lateralAvoidanceDirection: 'd'
        },
        agentState
    );

    let immediateCosts = getImmediateCosts(observation);

    //If we are on the edge of the game, reverse the lateral avoidance direction
    if (observation.position.x == observation.size - 1) {
        agentState.lateralAvoidanceDirection = 'a';
    } else if (observation.position.x == 0) {
        agentState.lateralAvoidanceDirection = 'd';
    }

    let costToSide = agentState.lateralAvoidanceDirection == 'd' ? immediateCosts.d : immediateCosts.a;

    let action = 's';

    if (immediateCosts.s > costToSide) {
        action = agentState.lateralAvoidanceDirection;
    }

    return {
        action: action,
        state: agentState //@todo clone
    };
}

function getImmediateCosts(observation) {
    let costOneBelow = 0;
    if (observation.position.y < observation.size - 1) {
        costOneBelow = observation.costs[observation.position.x][observation.position.y + 1];
    }

    let costOneToRight = 100;
    if (observation.position.x < observation.size - 1) {
        costOneToRight = observation.costs[observation.position.x + 1][observation.position.y];
    }

    let costOneToLeft = 100;
    if (observation.position.x > 0) {
        costOneToLeft = observation.costs[observation.position.x - 1][observation.position.y];
    }
    return {
        'a': costOneToLeft,
        's': costOneBelow - 4,
        'd': costOneToRight
    }
}