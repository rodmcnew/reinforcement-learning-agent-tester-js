import React, { useCallback, useEffect, useRef, useState } from 'react';
import useInterval from 'use-interval';
import './App.css';
import GameRunner from './GameRunner';
import { actions, config as environmentConfig } from './modules/environment';
import BrainExportButton from './modules/react-ui-component/BrainExportButton';
import GameRulesDisplay from './modules/react-ui-component/GameRulesDisplay';
import ObservationRenderer from './modules/react-ui-component/ObservationRenderer';
import ScoreHistoryChart from './modules/react-ui-component/ScoreHistoryChart';
import StatsDisplay from './modules/react-ui-component/StatsDisplay';
import { agents } from './agents';
import TopControls from './modules/react-ui-component/TopControls';
export const settings = {//@TODO move out of global?
    renderingEnabled: true,
    ticksPerIntervalWhenNotRendering: 10,
    initialSpeed: 100
};

const clearStatsAndNewGame = (gameRunner, agent, renderingEnabled) => {
    gameRunner.setRenderingEnabled(renderingEnabled);
    gameRunner.clearStats();
    gameRunner.newGame(agent.instance);
}

export const App = () => {
    // constructor() {

    //     _agents = agents;//@TODO take as construct arg?
    //     agentInstances = [];

    //     _settings = settings;//@TODO take as construct arg?

    //     state = {
    //         statsToDisplay: {},
    //         agentObservation: null,
    //         globalObservation: null,
    //         universalGameNumber: 0,
    //         currentAgentIndex: 0,
    //         speed: _settings.speed,
    //         lastStatusRenderTime: 0,
    //         lastStatusChartRenderTime: 0,
    //         scoreHistoryChartData: null
    //     };
    // }
    const [gameRunner, setGameRunner] = useState(null);
    const [gameState, setGameState] = useState({});
    const [speed, setSpeed] = useState(settings.initialSpeed);
    const [currentAgentIndex, setCurrentAgentIndex] = useState(0);

    const renderingEnabled = speed !== 0;
    const paused = speed === -1;

    const renderingEnabledRef = useRef();
    renderingEnabledRef.current = renderingEnabled;

    useEffect(() => {
        const gameRunner = new GameRunner(handleGameRendererRender, handleGameRunnerStatusChange);
        setGameRunner(gameRunner);
        clearStatsAndNewGame(gameRunner, agents[currentAgentIndex], renderingEnabled);
    }, [])

    useEffect(() => {
        if (gameRunner) {
            gameRunner.setRenderingEnabled(renderingEnabled);
        }
        settings.renderingEnabled = renderingEnabled;
    }, [renderingEnabled])

    const handleGameRendererRender = (agentObservation, globalObservation, universalGameNumber, stats) => {
        setGameState({
            agentObservation: agentObservation,
            globalObservation: globalObservation,
            universalGameNumber: universalGameNumber,
            stats: stats
        })
    }

    const handleGameRunnerStatusChange = (stats) => {
        setGameState({
            stats: stats
        })
    }

    const tick = () => { //@TODO tick many times per tick if luda speed?
        if (!paused && gameRunner) {
            if (renderingEnabled) {
                gameRunner.tick();
            } else {
                for (let i = 0; i < settings.ticksPerIntervalWhenNotRendering; i++) {
                    gameRunner.tick();
                }
            }
        }
    }
    useInterval(tick, paused ? 1000 : speed);

    // const setupInterval = () => { //@TODO consider not using intervals? Maybe use 50ms background rule or web workers to auto adjust to agent speed?
    //     var self = this;
    //     clearInterval(_intervalReference);
    //     if (_settings.autoPlay) {
    //         var ticksPerInterval = renderingEnabled ? 1 : ticksPerIntervalWhenNotRendering;
    //         // if (_agents[currentAgentIndex].ticksPerInterval) {
    //         //     //Allow very fast or very slow agents to have their own setting
    //         //     ticksPerInterval = _agents[currentAgentIndex].ticksPerInterval;
    //         // }
    //         // if (_settings.renderingEnabled) {
    //         //     ticksPerInterval = 1
    //         // }
    //         //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
    //         _intervalReference = setInterval(function () {
    //             for (let i = 0; i < ticksPerInterval; i++) {
    //                 self.gameRunner.tick();
    //             }
    //         }, _settings.speed);
    //     }
    // }

    const handleSpeedSelectorChange = useCallback((event) => {
        setSpeed(parseInt(event.target.value));
    }, [])

    // const componentDidUpdate = (prevProps, prevState) => {
    //     if (prevcurrentAgentIndex !== currentAgentIndex) {
    //         //Is the agent was changed, clear stats and start a new game
    //         clearStatsAndNewGame();
    //         setupInterval();//Some agents have their own speed interval so re setup the interval
    //     }
    // }

    const handleAgentSelectorChange = useCallback((event) => {
        const agentIndex = event.target.value;
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

    const handleManualControlClick = useCallback(() => {
        setSpeed(-1); // -1 means paused
    }, [])

    return <div>
        <div id="info">
            <TopControls agents={agents}
                speed={speed}
                handleAgentSelectorChange={handleAgentSelectorChange}
                handleClearBrainClick={handleClearBrainClick}
                handleSpeedSelectorChange={handleSpeedSelectorChange}
                handleManualControlKeyDown={handleManualControlKeyDown}
                handleManualControlClick={handleManualControlClick}
            />
            {gameState.stats &&
                <StatsDisplay stats={gameState.stats} />
            }
            <br />
        </div>
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
                <br />
                <div>Agent Data:</div>
                <canvas id="agentRendererCanvas" />
                {agents[currentAgentIndex].description &&
                    <div>
                        <br />
                        {agents[currentAgentIndex].description}
                    </div>
                }
            </div>
        }
        <br />
        <GameRulesDisplay environmentConfig={environmentConfig} />
        <br />
        <BrainExportButton gameRunner={gameRunner} />
    </div>
}
