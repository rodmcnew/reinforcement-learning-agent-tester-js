import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePrevious } from 'rooks';
import Worker from 'worker-loader!./worker';
import { agents } from './agents';
import './App.css';
import config from './config';
import { actions, config as environmentConfig } from './modules/environment';
import BrainExportButton from './modules/react-ui-component/BrainExportButton';
import GameRulesDisplay from './modules/react-ui-component/GameRulesDisplay';
import ObservationRenderer from './modules/react-ui-component/ObservationRenderer';
import ScoreHistoryChart from './modules/react-ui-component/ScoreHistoryChart';
import StatsDisplay from './modules/react-ui-component/StatsDisplay';
import TopControls from './modules/react-ui-component/TopControls';
import { WorkerInputActions, WorkerOutputActions } from './worker';

export const App = () => {
    const [gameState, setGameState] = useState({});

    const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
    const [worker, setWorker] = useState(null);
    const workerRef = useRef();

    const [speed, setSpeed] = useState(config.app.initialSpeed);
    const speedRef = useRef();
    speedRef.current = speed;

    const previousSpeed = usePrevious(speed);

    const renderingEnabled = speed !== -1;

    const renderingEnabledRef = useRef();
    renderingEnabledRef.current = renderingEnabled;

    const [exportedAgentBrainData, setExportedAgentBrainData] = useState();

    const handleWorkerMessage = (event) => {
        const action = event.data;
        // console.log('message from worker', action);
        switch (action.type) {
            case WorkerOutputActions.UpdateState:
                window.requestAnimationFrame(() => {
                    setGameState(action.payload);
                    if (action.payload.agentRenderData && agents[currentAgentIndex].render) {
                        agents[currentAgentIndex].render(action.payload.agentRenderData);
                    }
                    tick();
                })
                break;
            case WorkerOutputActions.ExportAgentBrainFulfilled:
                setExportedAgentBrainData(action.payload);
                break;
        }
    }

    useEffect(() => {
        const newWorker = new Worker();
        newWorker.postMessage({ type: WorkerInputActions.ClearStatsAndNewGame, payload: { renderingEnabled: true, agentIndex: 0 } });
        newWorker.addEventListener('message', handleWorkerMessage);
        setWorker(newWorker);
        workerRef.current = newWorker;
    }, [])

    useEffect(() => {
        if (speed !== previousSpeed) {
            const isLudicrousSpeed = speed === -1;

            /**
             * If the speed changes in or out of ludicrous speed, inform the web worker
             */
            if (worker) {
                worker.postMessage({ type: WorkerInputActions.SetLudicrousSpeedEnabled, payload: isLudicrousSpeed })
            }

            /**
             * Start ticking if the speed just changed to a speed that requires render-controlled ticking
             */
            if (previousSpeed === null) {
                tick();
            }
        }
    }, [speed, previousSpeed, worker])

    const postTickToWorker = () => {
        switch (speedRef.current) {
            case -1: // Ludicrous speed
                workerRef.current.postMessage({ type: WorkerInputActions.RequestStats });
            case null: // Paused
                return;
            default: // Slow, Medium, Fast, Very Fast
                workerRef.current.postMessage({ type: WorkerInputActions.Tick });
        }
    }

    const tick = () => {
        if (speedRef.current === 0 || speedRef.current === -1) {
            postTickToWorker();
        } else {
            setTimeout(postTickToWorker, speedRef.current);
        }
    }

    const handleAgentSelectorChange = useCallback((event) => {
        const agentIndex = event.target.value;
        worker.postMessage({ type: WorkerInputActions.SetAgentIndex, payload: agentIndex });
        setCurrentAgentIndex(agentIndex)
    }, [worker, currentAgentIndex])

    const handleClearBrainClick = useCallback(() => {
        worker.postMessage({ type: WorkerInputActions.ClearAgentBrain });
    }, [worker, currentAgentIndex])

    const handleManualControlKeyDown = useCallback((event) => {
        if (speed !== null) {
            // Prevents too many tick loops if user presses a WASD key while not paused
            return;
        }
        const action = actions.indexOf(event.key);
        if (action !== -1) {
            worker.postMessage({ type: WorkerInputActions.UserMove, payload: action });
        }
    }, [worker, speed])

    const handleExportAgentBrainRequest = useCallback(() => {
        worker.postMessage({ type: WorkerInputActions.RequestAgentBrainExport });
    }, [worker]);

    return <div className="container" onKeyDown={handleManualControlKeyDown}>
        <div className="card">
            <div className="card-header">
                Machine Learning Agent Tester
            </div>
            <div className="card-body">
                <TopControls agents={agents}
                    speed={speed}
                    handleAgentSelectorChange={handleAgentSelectorChange}
                    handleClearBrainClick={handleClearBrainClick}
                    handleSpeedChange={setSpeed}
                    handleManualControlKeyDown={handleManualControlKeyDown}
                />
                <hr />
                <div id="info">
                    {gameState.stats &&
                        <StatsDisplay stats={gameState.stats} />
                    }
                </div>
                <hr />
                {!renderingEnabled && gameState.stats &&
                    <div style={{ width: '30em' }}>
                        <ScoreHistoryChart stats={gameState.stats} />
                    </div>
                }
                {renderingEnabled && gameState.agentObservation &&
                    <div>
                        <ObservationRenderer
                            agentObservation={gameState.agentObservation}
                            globalObservation={gameState.globalObservation}
                            gameNumber={gameState.universalGameNumber}
                        />
                        {agents[currentAgentIndex].render &&
                            <>
                                <hr />
                                <div>Agent Data:</div>
                                <canvas id="agentRendererCanvas" />
                            </>
                        }
                    </div>
                }
                <hr />
                <GameRulesDisplay environmentConfig={environmentConfig} />
                {agents[currentAgentIndex].description &&
                    <>
                        <hr />
                        <div>Agent Description:</div>
                        <div>{agents[currentAgentIndex].description}</div>
                    </>
                }
                {agents[currentAgentIndex].class.prototype.exportBrain &&
                    <>
                        <hr />
                        <BrainExportButton onExportRequest={handleExportAgentBrainRequest}
                            exportedData={exportedAgentBrainData} />
                    </>
                }
                <hr />
                <a href="https://github.com/rodmcnew/reinforcement-learning-agent-tester-js">Documentation and Source Code</a>

            </div>
        </div>
    </div>
}
