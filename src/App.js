import React, {Component} from 'react';
import './App.css';

import {config as environmentConfig, actions} from './environment'
import './deep-q-network/runTests'
import HtmlTableRenderer from './renderer/HtmlTableRenderer'
import BrainExportButton from './component/BrainExportButton'
import ScoreHistoryChart from './component/ScoreHistoryChart'
import GameRulesDisplay from './component/GameRulesDisplay'
import agents from './agents'
// import './index.html'
import GameRunner from './GameRunner'
// import Chart from 'chart.js'

import StatsDisplay from './component/StatsDisplay'

export const settings = {//@TODO move out of global?
    // renderingEnabled: false,
    // speed: 0,
    renderingEnabled: true,
    speed: 250,//250,
    ticksPerIntervalWhenNotRendering: 100, //100 is good for speed, 10 is good for precise "actions per second" readout
    autoPlay: true,
};

class App extends Component {
    constructor() {
        super();
        this.setupInterval = this.setupInterval.bind(this);
        this.handleGameRunnerStatusChange = this.handleGameRunnerStatusChange.bind(this);
        this.handleSpeedSelectorChange = this.handleSpeedSelectorChange.bind(this);
        this.handleGameRendererRender = this.handleGameRendererRender.bind(this);
        this.handleAgentSelectorChange = this.handleAgentSelectorChange.bind(this);
        this.handleClearBrainClick = this.handleClearBrainClick.bind(this);
        this.handleManualControlKeyDown = this.handleManualControlKeyDown.bind(this);
        this.handleManualControlClick = this.handleManualControlClick.bind(this);

        this._agents = agents;//@TODO take as construct arg?

        this._settings = settings;//@TODO take as construct arg?

        this.state = {
            statsToDisplay: {},
            agentObservation: null,
            godObservation: null,
            universalGameNumber: 0,
            currentAgentIndex: 0,
            speed: this._settings.speed,
            lastStatusRenderTime: 0,
            lastStatusChartRenderTime: 0,
            scoreHistoryChartData: null
        };

    }

    componentWillMount() {
        this._gameRunner = new GameRunner(this.handleGameRendererRender, this.handleGameRunnerStatusChange);

        this.clearStatsAndNewGame();
        this.setupInterval();
    }

    handleGameRendererRender(agentObservation, godObservation, universalGameNumber) {
        this.setState({
            agentObservation: agentObservation,
            godObservation: godObservation,
            universalGameNumber: universalGameNumber
        })
    }

    handleGameRunnerStatusChange(stats) {
        var nowMilliseconds = (new Date()).getTime();
        if (nowMilliseconds > this.state.lastStatusRenderTime + 250) {//Refuse to render status html faster than 4fps
            this.setState({
                statsToDisplay: {
                    // 'Agent' :currentAgentName ,
                    'Current Score': stats.currentScore,
                    'Actions per second': stats.actionsPerSecond.toLocaleString(),
                    'Last Game Final Score': stats.lastGameScore,
                    'Average Final Score (trailing)': stats.averageFinalScore,
                    'Average Final Score (all time)': (Math.floor(stats.scoreSum / stats.gameCount) || 0),
                    // 'Average Reward' : (stats.totalReward / stats.actionCount).toFixed(2) ,
                    'Game Count': stats.gameCount.toLocaleString()
                },
                lastStatusRenderTime: nowMilliseconds
            });
        }

        if (nowMilliseconds > this.state.lastStatusChartRenderTime + 50) {//Refuse to render status chart faster than 20fps

            if (settings.renderingEnabled) {//Dont draw chart if rendering games
                return;
            }

            this.setState({
                scoreHistoryChartData: stats,
                lastStatusChartRenderTime: nowMilliseconds
            });

            // for (var i = 0, len = learningChart.data.labels.length; i < len; i++) {
            //     if (i % 10 != 0) {
            //         learningChart.data.labels[i] = '';
            //     }
            // }
        }

    }

    setupInterval() {
        var self = this;
        clearInterval(this._intervalReference);
        if (this._settings.autoPlay) {
            var ticksPerInterval = this._settings.ticksPerIntervalWhenNotRendering;
            if (this._agents[this.state.currentAgentIndex].ticksPerInterval) {
                //Allow very fast or very slow agents to have their own setting
                ticksPerInterval = this._agents[this.state.currentAgentIndex].ticksPerInterval;
            }
            if (this._settings.renderingEnabled) {
                ticksPerInterval = 1
            }
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
            this._intervalReference = setInterval(function () {
                for (let i = 0; i < ticksPerInterval; i++) {
                    self._gameRunner.tick();
                }
            }, this._settings.speed);
        }
    }

    clearStatsAndNewGame() {
        this._gameRunner.setRenderingEnabled(this._settings.renderingEnabled);
        this._gameRunner.clearStats();
        // this._gameRunner.newGame(agents[currentAgentName], this._settings.renderingEnabled);
        this._gameRunner.newGame(this._agents[this.state.currentAgentIndex].class, this._settings.renderingEnabled);
    }

    setSpeed(value) {//@TODO use setState in here
        this.setState({speed: value});
        let newEnableRenderingValue = true;
        this._settings.autoPlay = true;
        if (value === 'no-render') {
            newEnableRenderingValue = false;
            this._settings.speed = 0;
        } else if (value === 'paused') {
            this._settings.autoPlay = false;
        } else {
            this._settings.speed = value;
        }
        if (newEnableRenderingValue !== this._settings.renderingEnabled) {
            this._settings.renderingEnabled = newEnableRenderingValue;
            this._gameRunner.setRenderingEnabled(this._settings.renderingEnabled);
        }
        this.setupInterval();
    }

    handleSpeedSelectorChange(event) {
        this.setSpeed(event.target.value);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentAgentIndex !== this.state.currentAgentIndex) {
            //Is the agent was changed, clear stats and start a new game
            this.clearStatsAndNewGame();
            this.setupInterval();//Some agents have their own speed interval so re setup the interval
        }
    }

    handleAgentSelectorChange(event) {
        this.setState({currentAgentIndex: event.target.value});
    }

    handleClearBrainClick() {
        this._gameRunner.clearCurrentAgentBrain();
        this.clearStatsAndNewGame();
    }

    handleManualControlKeyDown(event) {
        if (actions.indexOf(event.key) !== -1) {
            this._gameRunner.takeAction(event.key);
        }
    }

    handleManualControlClick() {
        this.setSpeed('paused');
    }

    render() {
        return (
            <div className="App">
                <div id="info">Agent:
                    <select onChange={this.handleAgentSelectorChange}>
                        {this._agents.map(((agent, index) =>
                                <option key={index} value={index}>{agent.name}</option>
                        ))
                        }
                    </select>
                    &nbsp;
                    <button onClick={this.handleClearBrainClick}>Clear Brain and Retrain</button>
                    <br/>
                    Speed:
                    <select onChange={this.handleSpeedSelectorChange} value={this.state.speed}>
                        <option value="no-render">Ludicrous Speed (no rendering)</option>
                        <option value="0">Very Fast</option>
                        <option value="100">Fast</option>
                        <option value="250">Medium</option>
                        <option value="500">Slow</option>
                        <option value="paused">Paused</option>
                    </select>
                    &nbsp;
                    <button type="text"
                            onKeyDown={this.handleManualControlKeyDown}
                            onClick={this.handleManualControlClick}>Enable Manual Control (WASD)
                    </button>
                    <pre id="score"/>
                    <StatsDisplay stats={this.state.statsToDisplay}/>
                    <br/>
                </div>
                {!this._settings.renderingEnabled && this.state.scoreHistoryChartData &&
                <div style={{width: '30em'}}>
                    <ScoreHistoryChart stats={this.state.scoreHistoryChartData}/>
                    {/*<canvas id="learningChart" height="100"/>*/}
                </div>
                }
                {this._settings.renderingEnabled && this.state.agentObservation &&
                <div>
                    <HtmlTableRenderer
                        agentObservation={this.state.agentObservation}
                        godObservation={this.state.godObservation}
                        gameNumber={this.state.universalGameNumber}
                    />
                    <div id="agentRendererContainer"></div>
                </div>
                }
                <br/>
                <GameRulesDisplay environmentConfig={environmentConfig}/>
                <br/>
                <BrainExportButton gameRunner={this._gameRunner}/>
            </div>
        );
    }
}

export default App;
