import {applyAction, State as EnvironmentState} from '../../environment'

/**
 * An agent that looks ahead one square below, and to both sides. It then chooses the least costly.
 *
 * @constructor
 */
export default (observation, actionPathsToCheck)=> {
    function modelActionPathCost(actions, observation) {
        let environmentState = new EnvironmentState(
            observation.size,
            observation.costs,
            {x: observation.position.x, y: observation.position.y},
            observation.score,
            false
        );
        let startingScore = observation.score;
        for (let i = 0; i < actions.length; i++) {
            environmentState = applyAction(environmentState, actions[i]);
        }
        return startingScore - environmentState.score;
    }

    function pathAIsBetter(pathA, pathB) {
        return pathA.cost < pathB.cost
            || (
                pathA.cost == pathB.cost
                && pathA.path.length < pathB.path.length
            )
    }

    let lowestCostPathIndex = 0;
    for (let i = 0; i < actionPathsToCheck.length; i++) {
        actionPathsToCheck[i].cost = modelActionPathCost(actionPathsToCheck[i].path, observation);
        if (pathAIsBetter(actionPathsToCheck[i], actionPathsToCheck[lowestCostPathIndex])) {
            lowestCostPathIndex = i;
        }
    }

    return actionPathsToCheck[lowestCostPathIndex].path[0];
};
