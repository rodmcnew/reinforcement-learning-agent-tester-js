import React, { useCallback, useEffect, useRef, useState } from 'react';
import { agents } from './agents';
import './App.css';
import GameRunner from './GameRunner';
import { actions, config as environmentConfig } from './modules/environment';
import BrainExportButton from './modules/react-ui-component/BrainExportButton';
import GameRulesDisplay from './modules/react-ui-component/GameRulesDisplay';
import ObservationRenderer from './modules/react-ui-component/ObservationRenderer';
import ScoreHistoryChart from './modules/react-ui-component/ScoreHistoryChart';
import StatsDisplay from './modules/react-ui-component/StatsDisplay';
import TopControls from './modules/react-ui-component/TopControls';
export const settings = {//@TODO move out of global?
    renderingEnabled: true,
    initialSpeed: 100,
    ludicrousSpeed: {
        initialGameTicksPerRender: 1,
        maxGameTickBatchDurationMs: 50,
        batchSizeAdjustmentMultiplier: 2
    }
};

const clearStatsAndNewGame = (gameRunner, agent, renderingEnabled) => {
    gameRunner.setRenderingEnabled(renderingEnabled);
    gameRunner.clearStats();
    gameRunner.newGame(agent.instance);
}

export const App = () => {
    const [gameRunner, setGameRunner] = useState(null);
    const [gameState, setGameState] = useState({});
    const [currentAgentIndex, setCurrentAgentIndex] = useState(0);

    const [speed, setSpeed] = useState(settings.initialSpeed);
    const speedRef = useRef();
    speedRef.current = speed;

    const [ticksPerIntervalWhenNotRendering, setTicksPerIntervalWhenNotRendering] = useState(settings.ludicrousSpeed.initialGameTicksPerRender);
    const ticksPerIntervalWhenNotRenderingRef = useRef();
    ticksPerIntervalWhenNotRenderingRef.current = ticksPerIntervalWhenNotRendering;

    const [isTicking, setIsTicking] = useState(0);

    const renderingEnabled = speed !== -1;

    const renderingEnabledRef = useRef();
    renderingEnabledRef.current = renderingEnabled;

    useEffect(() => {
        const gameRunner = new GameRunner(handleGameRendererRender, handleGameRunnerStatusChange);
        setGameRunner(gameRunner);
        clearStatsAndNewGame(gameRunner, agents[currentAgentIndex], renderingEnabled);
    }, [])

    const runGameTickBatch = () => {
        const batchStartTimeMs = Date.now();
        for (let i = 0; i < ticksPerIntervalWhenNotRenderingRef.current; i++) {
            gameRunner.tick();
        }
        const batchDurationMs = Date.now() - batchStartTimeMs;
        if (batchDurationMs > settings.ludicrousSpeed.maxGameTickBatchDurationMs) {
            setTicksPerIntervalWhenNotRendering(ticksPerIntervalWhenNotRenderingRef.current / settings.ludicrousSpeed.batchSizeAdjustmentMultiplier);
        } else if (batchDurationMs < settings.ludicrousSpeed.maxGameTickBatchDurationMs / settings.ludicrousSpeed.batchSizeAdjustmentMultiplier) {
            const newValue = ticksPerIntervalWhenNotRenderingRef.current * settings.ludicrousSpeed.batchSizeAdjustmentMultiplier;
            if (newValue > 1) {
                setTicksPerIntervalWhenNotRendering(newValue);
            }
        }
    }

    const tick = () => {
        const tickStartTimeMs = Date.now();
        if (speedRef.current === null) {
            setIsTicking(false);
            return
        }
        setIsTicking(true);
        if (speedRef.current !== -1) {
            gameRunner.tick();
        } else {
            runGameTickBatch();
        }

        if (speedRef.current === 0 || speedRef.current === -1) {
            window.requestAnimationFrame(tick);
        } else {
            const tickDurationMs = Date.now() - tickStartTimeMs;
            setTimeout(() => {
                window.requestAnimationFrame(tick);
            }, speedRef.current - tickDurationMs);
        }
    }

    useEffect(() => {
        if (gameRunner && speed !== null && !isTicking) {
            tick();
        }
    }, [gameRunner, isTicking, speed]);

    useEffect(() => {
        if (gameRunner) {
            gameRunner.setRenderingEnabled(renderingEnabled);
        }
        settings.renderingEnabled = renderingEnabled;
    }, [renderingEnabled])

    const handleGameRendererRender = (agentObservation, globalObservation, universalGameNumber, stats) => {
        setGameState({
            agentObservation: { ...agentObservation },
            globalObservation: { ...globalObservation },
            universalGameNumber: universalGameNumber,
            stats: stats
        });
    }

    const handleGameRunnerStatusChange = (stats) => {
        setGameState({
            stats: stats
        })
    }

    const handleAgentSelectorChange = useCallback((event) => {
        const agentIndex = event.target.value;
        setTicksPerIntervalWhenNotRendering(settings.ludicrousSpeed.initialGameTicksPerRender);
        setCurrentAgentIndex(agentIndex);
        clearStatsAndNewGame(gameRunner, agents[agentIndex], renderingEnabled);
    }, [gameRunner, currentAgentIndex, renderingEnabled])

    const handleClearBrainClick = useCallback(() => {
        gameRunner.clearCurrentAgentBrain();
        clearStatsAndNewGame(gameRunner, agents[currentAgentIndex], renderingEnabled);
    }, [gameRunner, currentAgentIndex, renderingEnabled])

    const handleManualControlKeyDown = useCallback((event) => {
        const action = actions.indexOf(event.key);
        if (action !== -1) {
            gameRunner.takeAction(action);
        }
    }, [gameRunner])

    return <div className="container" onKeyDown={handleManualControlKeyDown}>
        <div className="card">
            <div className="card-header">
                Machine Learning Agent Tester
            </div>
            <div className="card-body">
                {/* {ticksPerIntervalWhenNotRendering} */}
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
                        <hr />
                        <div>Agent Data:</div>
                        <canvas id="agentRendererCanvas" />
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
                <hr />
                <BrainExportButton gameRunner={gameRunner} />
            </div>
        </div>
    </div>
}
