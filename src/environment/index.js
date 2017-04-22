import {shiftAndTrimMatrix} from '../tensorTools'
import AgentObservation from './AgentObservation'
import {generateInitialState} from './generateInitialState'
// import {getVisibleTiles} from './getVisibleTiles'

export const config = {
    size: [31, 31],
    // viewPortSize: [7, 5],
    // viewPortOffset: [0, 1],
    viewPortSize: [9, 9],
    viewPortOffset: [0, 2],
    verticalDeltaScore: 4,
    maxTileCost: 9
};

/**
 * The main environment class for this game. This is the public interface for the game.
 */
export default class Environment {
    constructor() {
        this._state = generateInitialState();

        //Bind these to create proper JavaScript "this" context
        this.applyAction = this.applyAction.bind(this);
        this.getAgentObservation = this.getAgentObservation.bind(this);
        this.getGodObservation = this.getGodObservation.bind(this);
    }

    /**
     * Mutates the environment's internal state by processing the given action
     *
     * @param actionCode
     */
    applyAction(actionCode) {
        switch (actionCode) {
            case "w":
                if (this._state.position[1] > 0) {
                    this._state.position[1]--;
                }
                this._state.score = this._state.score - config.verticalDeltaScore;
                break;
            case "a":
                if (this._state.position[0] > 0) {
                    this._state.position[0]--;
                }
                break;
            case "s":
                if (this._state.position[1] < config.size[1] - 1) {
                    this._state.position[1]++;
                }
                this._state.score = this._state.score + config.verticalDeltaScore;
                break;
            case "d":
                if (this._state.position[0] < config.size[0] - 1) {
                    this._state.position[0]++;
                }
                break;
        }

        this._state.score = this._state.score - this._state.costs[this._state.position[0]][this._state.position[1]];

        this._state.isComplete = this._state.position[1] == config.size[1] - 1;// || this._state.score < -100;

    }

    /**
     * Returns what the agent can see about the current environment state
     *
     * @returns {AgentObservation}
     */
    getAgentObservation() {
        const trimAmount = [
            Math.floor((config.size[0] - config.viewPortSize[0]) / 2),
            Math.floor((config.size[1] - config.viewPortSize[1]) / 2)
        ];
        const shiftVector = [
            Math.ceil(this._state.position[0] - config.size[0] / 2),
            Math.ceil(this._state.position[1] - config.size[0] / 2) + config.viewPortOffset[1]
        ];
        const trimVector = [trimAmount[0], trimAmount[1]];
        return new AgentObservation(
            // shiftAndTrimMatrix(getVisibleTiles(this._state), shiftVector, 1, trimVector),
            shiftAndTrimMatrix(this._state.costs, shiftVector, 9, trimVector),
            this._state.score,
            [
                Math.floor(config.size[0] / 2) - trimAmount[0],
                Math.floor(config.size[1] / 2) - trimAmount[1] - config.viewPortOffset[1]
            ]
        );
    }

    getGodObservation() {
        return this._state
    }
}
