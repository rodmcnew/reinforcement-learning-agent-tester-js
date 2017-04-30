import Environment from './environment'

const defaultStats = {
    currentScore: 0,
    lastGameScore: 0,
    scoreSum: 0,
    gameCount: 0,
    actionCount: 0,
    actionsPerSecond: 0,
    lastSecondsActionCount: 0,
    lastFinalScores: []
};

export default class GameRunner {
    constructor(renderer, onStatusChange) {
        this._renderingEnabled = false;
        this._renderer = renderer;
        this._stats = Object.assign({}, defaultStats);
        this._onStatusChange = onStatusChange;
        this._agentObservation = null;
        this._godObservation = null;
        this._agentClass = null;
        this._nextAction = 0;

        this.newGame = this.newGame.bind(this);
        this.takeAction = this.takeAction.bind(this);
        this.tick = this.tick.bind(this);
        this.clearStats = this.clearStats.bind(this);

        setInterval(() => {//@TODO accomplish this without an interval
            this._stats.actionsPerSecond = this._stats.actionCount - this._stats.lastSecondsActionCount;
            this._stats.lastSecondsActionCount = this._stats.actionCount;
        }, 1000);
    }

    newGame(agentClass, renderingEnabled) {
        this._agentClass = agentClass;
        this._agent = new this._agentClass();
        this._renderingEnabled = renderingEnabled;
        this._environment = new Environment();
        this._stats.currentScore = 0;//@TODO get from environment?
        if (this._renderingEnabled) {
            //@TODO have this render make the table its self inside a given div
            this._renderer.clear();
            this._renderer.render(this._environment.getAgentObservation(), this._environment.getGodObservation());
        } else {
            this._onStatusChange(this._stats);
        }
        this._updateObservations();
    }

    /**
     *
     * @param actionCode
     */
    takeAction(actionCode) {
        //Apply the action and get the next observation
        this._environment.applyAction(actionCode);
        this._updateObservations();

        if (this._godObservation.isComplete) {//@Find better way to communicate "isComplete"
            this._agent.getAction(this._agentObservation);//Ask for one more action so the agent can see the observation after its last action
            this._stats.lastGameScore = this._agentObservation.score;
            this._stats.lastFinalScores.push(this._agentObservation.score);
            if (this._stats.lastFinalScores.length > 100) {
                this._stats.lastFinalScores.shift();
            }
            this._stats.scoreSum += this._agentObservation.score;
            this._stats.gameCount += 1;
            this.newGame(this._agentClass, this._renderingEnabled);
        }

        if (this._renderingEnabled) {
            this._renderer.render(this._agentObservation, this._godObservation);
            this._stats.currentScore = this._agentObservation.score;
            this._onStatusChange(this._stats);
        }

        this._stats.actionCount++;

        this._nextAction = this._agent.getAction(this._agentObservation);
    }

    tick() {
        this.takeAction(this._nextAction);
    }

    clearStats() {
        this._stats = Object.assign({}, defaultStats);
        this._stats.lastFinalScores = [];
    }

    _updateObservations() {
        this._agentObservation = this._environment.getAgentObservation();
        this._godObservation = this._environment.getGodObservation();
    }
}
