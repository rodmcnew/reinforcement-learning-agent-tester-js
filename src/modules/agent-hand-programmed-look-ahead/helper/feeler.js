import { config, actions } from '../../environment'

export const oppositeActions = {
    w: 's',
    a: 'd',
    s: 'w',
    d: 'a'
};

const actionVectors = {
    //[dX, dY, dScore]
    w: [0, -1, config.actionCodeToDeltaScore['w']],
    a: [-1, 0, config.actionCodeToDeltaScore['a']],
    s: [0, 1, config.actionCodeToDeltaScore['s']],
    d: [1, 0, config.actionCodeToDeltaScore['d']],
};
export function getFeelerValue(observation, feelerSteps) {
    // let position = [observation.position[0], observation.position[1]];
    let position = config.viewPortPosition;
    let value = 0;
    feelerSteps.forEach((step) => {
        const vector = actionVectors[step];
        position = [position[0] + vector[0], position[1] + vector[1]];
        let cost;
        if (typeof observation[position[0]] === 'undefined' || typeof observation[position[0]][position[1]] === 'undefined') {
            cost = config.tileTypeToDeltaScore[1]; //If going off map, make look very expensive
        } else {
            cost = config.tileTypeToDeltaScore[observation[position[0]][position[1]]]
        }
        value = value + vector[2] + cost;
    });
    return value;
}

export function getFeelerValues(observation, feelerPaths) {
    return feelerPaths.map((feelerPath) => {
        return {
            path: feelerPath,
            value: getFeelerValue(observation, feelerPath)
        }
    });
}

export function filterPathsWithFirstAction(paths, blacklistedFirstAction) {
    return paths.filter((path) => path[0] !== blacklistedFirstAction);
}

export function getBestFeeler(feelersWithValues) {
    return feelersWithValues.reduce((bestFeelerSoFar, feeler) => {
        if (bestFeelerSoFar === null || feeler.value > bestFeelerSoFar.value) {
            return feeler;
        } else {
            return bestFeelerSoFar
        }
    }, null)
}

export function getActionViaFeelers(observation, feelerPaths, lastAction) {
    //This filter prevents infinite back-and-forth movement
    const safeFeelerPaths = filterPathsWithFirstAction(
        feelerPaths, oppositeActions[lastAction]
    );

    const feelersWithValues = getFeelerValues(observation, safeFeelerPaths);

    const bestFeeler = getBestFeeler(feelersWithValues);

    return actions.indexOf(bestFeeler.path[0]);
}
