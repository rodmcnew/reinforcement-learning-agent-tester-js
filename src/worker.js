import { agents } from "./agents";
import GameRunner from "./GameRunner";
import config from './config';
import LudicrousSpeedTicker from "./LudicrousSpeedTicker";
const ctx = self;

export const WorkerInputActions = {
    Tick: 'TICK',
    ClearStatsAndNewGame: 'CLEAR_STATS_AND_NEW_GAME',
    SetLudicrousSpeedEnabled: 'SET_LUDICROUS_SPEED_ENABLED',
    RequestStats: 'REQUEST_STATS',
    UserMove: 'USER_MOVE',
    SetAgentIndex: 'SET_AGENT_INDEX',
    ClearAgentBrain: 'CLEAR_AGENT_BRAIN'
}

export const WorkerOutputActions = {
    UpdateState: 'UPDATE_STATE',
}

const gameRunner = new GameRunner();
const ludicrousSpeedTicker = new LudicrousSpeedTicker(gameRunner.tick, config.ludicrousSpeed);
const agentInstances = [];

let agentIndex = 0;

const clearStatsAndNewGame = () => {
    if (!agentInstances[agentIndex]) {
        agentInstances[agentIndex] = new agents[agentIndex].class();
    }

    gameRunner.setRenderingEnabled(!ludicrousSpeedTicker.ludicrousSpeedEnabled);
    gameRunner.clearStats();
    gameRunner.newGame(agentInstances[agentIndex]);

    ludicrousSpeedTicker.handleAgentChange();
}

/**
 * Handle messages from the parent thread
 */
ctx.addEventListener("message", (event) => {
    const action = event.data;
    // console.log('action to worker', action);
    switch (action.type) {
        case WorkerInputActions.Tick:
            ctx.postMessage({
                type: WorkerOutputActions.UpdateState,
                payload: gameRunner.tick()
            });
            break;
        case WorkerInputActions.ClearStatsAndNewGame:
            clearStatsAndNewGame();
            break;
        case WorkerInputActions.SetLudicrousSpeedEnabled:
            ludicrousSpeedTicker.setLudicrousSpeedTickingEnabled(action.payload);
            gameRunner.setRenderingEnabled(!ludicrousSpeedTicker.ludicrousSpeedEnabled);
            break;
        case WorkerInputActions.RequestStats:
            ctx.postMessage({
                type: WorkerOutputActions.UpdateState,
                payload: {
                    stats: gameRunner.getStats()
                    // stats: {
                    //     ...gameRunner.getStats(),
                    //     batchSize: ludicrousSpeedTicker.ludicrousBatchSize
                    // }
                }
            });
            break;
        case WorkerInputActions.UserMove:
            ctx.postMessage({
                type: WorkerOutputActions.UpdateState,
                payload: gameRunner.takeAction(action.payload)
            });
            break;
        case WorkerInputActions.SetAgentIndex:
            agentIndex = action.payload;
            clearStatsAndNewGame();
            break;
        case WorkerInputActions.ClearAgentBrain:
            gameRunner.clearCurrentAgentBrain();
            clearStatsAndNewGame();
            break;
    }
});