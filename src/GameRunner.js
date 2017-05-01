import Environment from './environment'

const defaultStats = {
    currentScore: 0,
    lastGameScore: 0,
    scoreSum: 0,
    gameCount: 0,
    actionCount: 0,
    actionsPerSecond: 0,
    lastSecondsActionCount: 0,
    lastFinalScores: [],
    gameCountToScore: [],
    gameCountToAverageScore: [],
    averageFinalScore: 0,
    rewards: [],
    lastActionScore: 0,
    totalReward: 0,
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
        this.setRenderingEnabled = this.setRenderingEnabled.bind(this);

        setInterval(() => {//@TODO accomplish this without an interval
            this._stats.actionsPerSecond = this._stats.actionCount - this._stats.lastSecondsActionCount;
            this._stats.lastSecondsActionCount = this._stats.actionCount;
        }, 1000);
    }

    newGame(agentClass) {
        this._agentClass = agentClass;
        this._agent = new this._agentClass();
        // this._renderingEnabled = renderingEnabled;
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

    clearCurrentAgentBrain() {
        if (this._agent.clearBrain) {
            this._agent.clearBrain();
        }
    }

    /**
     *
     * @param actionCode
     */
    takeAction(actionCode) {
        var stats = this._stats;
        //Apply the action and get the next observation
        this._environment.applyAction(actionCode);
        this._updateObservations();

        if (this._godObservation.isComplete) {//@Find better way to communicate "isComplete"
            this._agent.getAction(this._agentObservation);//Ask for one more action so the agent can see the observation after its last action
            stats.lastGameScore = this._agentObservation.score;
            stats.lastFinalScores.push(this._agentObservation.score);
            if (stats.lastFinalScores.length > 100) {
                stats.lastFinalScores.shift();
            }
            var totalScoreFinaleScore = stats.lastFinalScores.reduce((acc, val) => acc + val, 0);
            stats.averageFinalScore = Math.floor(totalScoreFinaleScore / stats.lastFinalScores.length) || 0;
            stats.scoreSum += this._agentObservation.score;
            stats.gameCountToScore[stats.gameCount] = stats.lastGameScore;
            stats.gameCountToAverageScore[stats.gameCount] = stats.averageFinalScore;
            stats.gameCount += 1;
            this.newGame(this._agentClass, this._renderingEnabled);
        }

        if (this._renderingEnabled) {
            this._renderer.render(this._agentObservation, this._godObservation);
            stats.currentScore = this._agentObservation.score;
            this._onStatusChange(stats);
        }

        stats.actionCount++;
        var reward = this._agentObservation.score - stats.lastActionScore;
        stats.lastActionScore = this._agentObservation.score;
        stats.totalReward += reward;
        stats.rewards.push(reward);

        this._nextAction = this._agent.getAction(this._agentObservation);
    }

    setRenderingEnabled(renderingEnabled) {
        this._renderingEnabled = renderingEnabled;
    }

    getCurrentAgentInstance() {
        return this._agent;
    }

    tick() {
        this.takeAction(this._nextAction);
    }

    clearStats() {
        this._stats = Object.assign({}, defaultStats);
        this._stats.lastFinalScores = [];
        this._stats.gameCountToScore = [];
        this._stats.gameCountToAverageScore = [];
        this._stats.rewards = [];
    }

    _updateObservations() {
        this._agentObservation = this._environment.getAgentObservation();
        this._godObservation = this._environment.getGodObservation();
    }
}
