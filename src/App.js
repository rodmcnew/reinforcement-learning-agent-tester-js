import React, { useCallback, useEffect, useState } from 'react';
import { agents } from './agents';
import './App.css';
import config from './config';
import { actions, config as environmentConfig } from './modules/environment';
import GameRulesDisplay from './modules/react-ui-component/GameRulesDisplay';
import ObservationRenderer from './modules/react-ui-component/ObservationRenderer';
import ScoreHistoryChart from './modules/react-ui-component/ScoreHistoryChart';
import StatsDisplay from './modules/react-ui-component/StatsDisplay';
import TopControls from './modules/react-ui-component/TopControls';
import { SimulationManager } from './modules/simulation-manager';

export const App = () => {
    const [gameState, setGameState] = useState({});
    const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
    const [simulationManager, setSimulationManager] = useState(null);
    const [speed, setSpeed] = useState(config.app.initialSpeed);

    const renderingEnabled = speed !== -1;

    const handleUpdateGameState = (payload) => {
        setGameState(payload);
        if (payload.agentRenderData && agents[currentAgentIndex].render) {
            agents[currentAgentIndex].render(payload.agentRenderData);
        }
    }

    const handleExportAgentBrainFulfilled = (agentBrainData) => {
        navigator.clipboard.writeText(
            'export const data = JSON.parse(\'' + JSON.stringify(agentBrainData) + '\');'
        );
    }

    /**
     * On mount, create a new simulation manager
     */
    useEffect(() => {
        setSimulationManager(new SimulationManager(handleUpdateGameState, handleExportAgentBrainFulfilled));
    }, [])

    /**
     * If the speed changes, let the simulation manager know
     */
    useEffect(() => {
        if (simulationManager) {
            simulationManager.setSpeed(speed);
        }
    }, [speed, simulationManager]);

    /**
     * If the currentAgentIndex changes, let the simulation manager know
     */
    useEffect(() => {
        if (simulationManager) {
            simulationManager.setAgentIndex(currentAgentIndex);
        }
    }, [currentAgentIndex, simulationManager])

    const handleAgentSelectorChange = useCallback((event) => {
        setCurrentAgentIndex(event.target.value);
    }, [simulationManager])

    const handleClearBrainClick = useCallback(() => {
        simulationManager.clearAgentBrain();
    }, [simulationManager])

    const handleManualControlKeyDown = useCallback((event) => {
        if (speed !== null) {
            // Prevents too many tick loops if user presses a WASD key while not paused
            return;
        }
        const action = actions.indexOf(event.key);
        if (action !== -1) {
            simulationManager.userMove(action);
        }
    }, [simulationManager, speed])

    const handleExportAgentBrainRequest = useCallback(() => {
        simulationManager.requestAgentBrainExport()
    }, [simulationManager]);

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
                        <button className="btn btn-secondary" onClick={handleExportAgentBrainRequest}>
                            Export Agent Brain to Clipboard
                        </button>
                    </>
                }
                <hr />
                <a href="https://github.com/rodmcnew/reinforcement-learning-agent-tester-js">Documentation and Source Code</a>

            </div>
        </div>
    </div>
}
