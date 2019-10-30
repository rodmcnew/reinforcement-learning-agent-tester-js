import { getActionViaFeelers } from './helper/feeler'
import generateFeelerPaths from './helper/generateFeelerPathsXByThree'
export default class LookAhead9x3 {
    constructor() {
        this._state = { lastAction: null };
        this.feelerPaths = generateFeelerPaths(4);
    }

    static getName() {
        return 'HandProgrammed - LookAhead - 9x3 - ranked 0.956';
    }

    getAction(lastAction, lastReward, observationMatrix) {
        let action = getActionViaFeelers(observationMatrix, this.feelerPaths, this._state.lastAction);

        this._state.lastAction = action;

        return action;
    }

    newGame() { }
}
