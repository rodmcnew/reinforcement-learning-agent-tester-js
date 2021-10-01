import settings from '../../config';
import { getActionViaFeelers } from './helper/feeler'
import generateFeelerPaths from './helper/generateFeelerPathsXByThree'
export default class LookAhead9x3 {
    constructor() {
        this._state = { lastAction: null };
        this.feelerPaths = generateFeelerPaths(4);
    }

    static getName() {
        return 'Hand Programmed - Look Ahead - 9x3 Viewport';
    }

    static getDescription() {
        return 'This agent was programmed by hand. It looks ahead in time by several actions.';
    }

    getAction(lastAction, lastReward, observationMatrix) {

        /**
         * This is for testing purposes only. This could be removed later.
         */
        if (settings.lookAhead9x3.wasteTimeMs) {
            const wasteTimeUntil = Date.now() + settings.lookAhead9x3.wasteTimeMs;
            while (Date.now() < wasteTimeUntil) { }
        }

        let action = getActionViaFeelers(observationMatrix, this.feelerPaths, this._state.lastAction);

        this._state.lastAction = action;

        return [action, {}];
    }

    newGame() { }
}
