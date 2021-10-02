import Worker from 'worker-loader!./simulationWorker';
import { WorkerInputActions, WorkerOutputActions } from './simulationWorker';

/**
 * This is the external interface that UIs can use to interact with the simulation.
 * 
 * Internally this manages a web worker that runs the simulation in a separate thread.
 */
class SimulationManager {
    constructor(onUpdateGameState, onExportAgentBrainFulfilled) {
        this.handleWorkerMessage = this.handleWorkerMessage.bind(this);
        this.postTickToWorker = this.postTickToWorker.bind(this);
        this.tick = this.tick.bind(this);
        this.setSpeed = this.setSpeed.bind(this);

        this.worker = new Worker();
        this.worker.postMessage({
            type: WorkerInputActions.ClearStatsAndNewGame,
            payload: { renderingEnabled: true, agentIndex: 0 }
        });
        this.worker.addEventListener('message', this.handleWorkerMessage);

        this.setSpeed = this.setSpeed.bind(this);
        this.onUpdateGameState = onUpdateGameState;
        this.onExportAgentBrainFulfilled = onExportAgentBrainFulfilled;
    }

    /**
     * @private
     */
    handleWorkerMessage = (event) => {
        const action = event.data;
        // console.log('message from worker', action);
        switch (action.type) {
            case WorkerOutputActions.UpdateState:
                window.requestAnimationFrame(() => {
                    this.onUpdateGameState(action.payload);
                    this.tick();
                })
                break;
            case WorkerOutputActions.ExportAgentBrainFulfilled:
                this.onExportAgentBrainFulfilled(action.payload);
                break;
        }
    }

    /**
     * @private
     */
    postTickToWorker = () => {
        switch (this.speed) {
            case -1: // Ludicrous speed
                this.worker.postMessage({ type: WorkerInputActions.RequestStats });
            case null: // Paused
                return;
            default: // Slow, Medium, Fast, Very Fast
                this.worker.postMessage({ type: WorkerInputActions.Tick });
        }
    }

    /**
     * @private
     */
    tick = () => {
        if (this.speed === 0 || this.speed === -1) {
            this.postTickToWorker();
        } else {
            setTimeout(this.postTickToWorker, this.speed);
        }
    }

    setSpeed(speed) {
        const previousSpeed = this.speed;
        this.speed = speed;
        if (speed !== previousSpeed) {
            const isLudicrousSpeed = speed === -1;

            /**
             * If the speed changes in or out of ludicrous speed, inform the web worker
             */
            this.worker.postMessage({ type: WorkerInputActions.SetLudicrousSpeedEnabled, payload: isLudicrousSpeed })

            /**
             * Start ticking if the speed just changed to a speed that requires render-controlled ticking
             */
            if (previousSpeed === null || previousSpeed === undefined) {
                this.tick();
            }
        }
    }

    setAgentIndex(agentIndex) {
        this.worker.postMessage({ type: WorkerInputActions.SetAgentIndex, payload: agentIndex });
    }

    clearAgentBrain() {
        this.worker.postMessage({ type: WorkerInputActions.ClearAgentBrain });
    }

    userMove(action) {
        this.worker.postMessage({ type: WorkerInputActions.UserMove, payload: action });
    }

    requestAgentBrainExport() {
        this.worker.postMessage({ type: WorkerInputActions.RequestAgentBrainExport });
    }
}

export default SimulationManager;