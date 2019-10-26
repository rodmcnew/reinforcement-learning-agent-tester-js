import {shiftAndTrimMatrix, createMatrix} from './nestedFloatMatrixMath'
import AgentObservation from './AgentObservation'
import {generateInitialState} from './generateInitialState'

export const config = {
    //Environment size
    size: [31, 31],

    //Viewport settings
    viewPortSize: [9, 9],
    viewPortOffset: [0, 2],
    viewPortPosition: [4, 2],

    //Scoring settings
    verticalDeltaScore: 10,
    deltaScorePerAction: -1,
    tileTypeToDeltaScore: [0, -50]
};

export const actions = ['w', 'a', 's', 'd'];

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

        //This viewport output matrix is only instantiated once to increase performance
        this.viewportOutputMatrix = createMatrix(config.viewPortSize);
    }

    /**
     * Mutates the environment's internal state by processing the given action
     *
     * @param actionCode
     */
    applyAction(actionCode) {
        var deltaScoreFromHittingEdge = 0;
        switch (actionCode) {
            case "w":
                if (this._state.position[1] > 0) {
                    this._state.position[1]--;
                    this._state.score -= config.verticalDeltaScore;
                } else {
                    deltaScoreFromHittingEdge = config.tileTypeToDeltaScore[1];//Edges are tileType 1 (red)
                }
                break;
            case "a":
                if (this._state.position[0] > 0) {
                    this._state.position[0]--;
                } else {
                    deltaScoreFromHittingEdge = config.tileTypeToDeltaScore[1];//Edges are tileType 1 (red)
                }
                break;
            case "s":
                this._state.position[1]++;
                this._state.score = this._state.score + config.verticalDeltaScore;
                break;
            case "d":
                if (this._state.position[0] < config.size[0] - 1) {
                    this._state.position[0]++;
                } else {
                    deltaScoreFromHittingEdge = config.tileTypeToDeltaScore[1];//Edges are tileType 1 (red)
                }
                break;
            default:
                throw new Error('Unknown action: ' + actionCode)
        }

        const tileType = this._state.tileTypes[this._state.position[0]][this._state.position[1]];

        this._state.score +=
            config.tileTypeToDeltaScore[tileType] +
            config.deltaScorePerAction +
            deltaScoreFromHittingEdge;

        this._state.isComplete = this._state.position[1] === config.size[1] - 1;
    }

    /**
     * Returns what the agent can see about the current environment state
     *
     * @returns {AgentObservation}
     */
    getAgentObservation() {
        const shiftVector = [
            Math.ceil(this._state.position[0] - config.size[0] / 2),
            Math.ceil(this._state.position[1] - config.size[0] / 2) + config.viewPortOffset[1]
        ];
        const trimVector = [
            Math.floor((config.size[0] - config.viewPortSize[0]) / 2),
            Math.floor((config.size[1] - config.viewPortSize[1]) / 2)
        ];

        shiftAndTrimMatrix(this._state.tileTypes, shiftVector, 1, trimVector, this.viewportOutputMatrix);

        //Make the bottom exit edge look safe by making its tiles not red
        const limit = config.size[1] - trimVector[1] - shiftVector[1];
        if (limit < config.viewPortSize[1]) {
            for (var x = 0; x < config.viewPortSize[0]; x++) {
                for (var y = limit; y < config.viewPortSize[1]; y++) {
                    this.viewportOutputMatrix[x][y] = 0;
                }
            }
        }

        return new AgentObservation(
            this.viewportOutputMatrix,
            this._state.score,
            config.viewPortPosition
        );
    }

    getGodObservation() {
        return this._state
    }
}
