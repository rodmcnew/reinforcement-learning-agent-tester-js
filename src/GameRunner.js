import { default as Environment, actions, config } from './modules/environment'
const historyLength = 1000;

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
    lastActionScore: 0,
    totalReward: 0,
};

export default class GameRunner {
    constructor(onRender, onStatusChange) {
        this._universalGameNumber = 0;
        this._renderingEnabled = false;
        this._onRender = onRender;
        this._stats = Object.assign({}, defaultStats);
        this._onStatusChange = onStatusChange;
        this._agentObservation = null;
        this._globalObservation = null;
        // this._agentClass = null;
        // this._nextAction = null;
        this._nextAction = 0;//@TODO this doesn't seem right

        this.newGame = this.newGame.bind(this);
        this.takeAction = this.takeAction.bind(this);
        this.tick = this.tick.bind(this);
        this.clearStats = this.clearStats.bind(this);
        this.setRenderingEnabled = this.setRenderingEnabled.bind(this);

        this.last = { action: null, reward: null };

        setInterval(() => {//@TODO accomplish this without an interval
            this._stats.actionsPerSecond = this._stats.actionCount - this._stats.lastSecondsActionCount;
            this._stats.lastSecondsActionCount = this._stats.actionCount;
        }, 1000);
    }

    newGame(agentInstance) {
        this._universalGameNumber++;
        // this._agentClass = agentClass;
        this._agent = agentInstance;
        // this._agent = new this._agentClass();
        // this._renderingEnabled = renderingEnabled;
        this._environment = new Environment();
        this._stats.currentScore = 0;//@TODO get from environment?
        // if (this._renderingEnabled) { // Removed to prevent calling onRender twice for new games
        //     //@TODO have this render make the table its self inside a given div
        //     // this._onRender.clear();
        //     this._onRender(
        //         this._environment.getAgentObservation(),
        //         this._environment.getGlobalObservation(),
        //         this._universalGameNumber,
        //         this._stats
        //     );
        // } else {
        //     this._onStatusChange(this._stats);
        // }
        if (!this.renderingEnabled) {
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
    takeAction(action) {
        var stats = this._stats;
        const actionCode = actions[action];
        //Apply the action and get the next observation
        if (actionCode !== null) {
            this._environment.applyAction(actionCode);
        }
        this._updateObservations();

        if (this._globalObservation.isComplete) {//@Find better way to communicate "isComplete"
            this._agent.getAction(this.last.action, this.last.reward, this._agentObservation.tileTypes);//Ask for one more action so the agent can see the observation after its last action
            this._agent.newGame();
            stats.lastGameScore = stats.currentScore;
            stats.lastFinalScores.push(stats.currentScore);
            if (stats.lastFinalScores.length > 100) {
                stats.lastFinalScores.shift();
            }
            var totalScoreFinaleScore = stats.lastFinalScores.reduce((acc, val) => acc + val, 0);
            stats.averageFinalScore = (totalScoreFinaleScore / stats.lastFinalScores.length) || 0;
            stats.scoreSum += stats.currentScore;
            stats.gameCountToScore.push(stats.lastGameScore);
            stats.gameCountToAverageScore.push(stats.averageFinalScore);
            stats.gameCount += 1;

            //If the history arrays get twice as large as the preferred history length, slice them off.
            if (stats.gameCountToScore.length > historyLength * 2) {
                stats.gameCountToScore = stats.gameCountToScore.slice(-historyLength);
                stats.gameCountToAverageScore = stats.gameCountToAverageScore.slice(-historyLength);
            }

            this.newGame(this._agent);
        }

        if (this._renderingEnabled) {
            this._onRender(this._agentObservation, this._globalObservation, this._universalGameNumber, stats);
        }

        stats.actionCount++;
        var reward = this._agentObservation.lastReward;
        stats.lastActionScore = stats.lastActionScore + this._agentObservation.lastReward;
        stats.currentScore += this._agentObservation.lastReward;
        stats.totalReward += reward;

        this.last.reward = reward;
        this.last.action = action;

        this._nextAction = this._agent.getAction(this.last.action, this.last.reward, this._agentObservation.tileTypes);
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
        this._stats.currentScore = 0;
    }

    _updateObservations() {
        this._agentObservation = this._environment.getAgentObservation();
        this._globalObservation = this._environment.getGlobalObservation();
    }
}
