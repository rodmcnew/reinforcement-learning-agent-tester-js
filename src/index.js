import './deep-q-network/runTests'
import HtmlTableRenderer from './renderer/HtmlTableRenderer'
import LookAheadWide from './agent/hand-programmed/LookAheadWide'
import LookAheadDeep from './agent/hand-programmed/LookAheadDeep'
import AlwaysMoveStraightDown from './agent/hand-programmed/AlwaysMoveStraightDown'
import LookAheadOneMove from './agent/hand-programmed/LookAheadOneMove'
import RL_DQN_Untrained from './agent/machine-learning/RL_DQN_Untrained'
import RL_DQN_PreTrained from './agent/machine-learning/RL_DQN_PreTrained'
import html from './index.html'
import GameRunner from './GameRunner'
import SpeedIntervalSelectElement from './SpeedIntervalSelectElement'

export const settings = {
    renderingEnabled: true,
    speed: 250,
    // renderingEnabled: true,
    // speed: 250,
    ticksPerIntervalWhenNotRendering: 100,//100 is good for speed, 10 is good for precise "actions per second" readout
    autoPlay: true,
};

document.body.innerHTML = html;
const scoreElement = document.getElementById('score');

let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new HtmlTableRenderer(document.getElementById('rendererContainer'));

let gameRunner = new GameRunner(renderer, handleGameRunnerStatusChange);

let agents = {
    'MachineLearning - RL_DQN_Untrained': RL_DQN_Untrained,
    'MachineLearning - RL_DQN_PreTrained - ranked 192': RL_DQN_PreTrained,
    'HandProgrammed - LookAheadDeep - ranked 234': LookAheadDeep,
    'HandProgrammed - LookAheadWide - ranked 228': LookAheadWide,
    'HandProgrammed - LookAheadOneMove - ranked 192': LookAheadOneMove,
    'HandProgrammed - AlwaysMoveStraightDown - ranked 80': AlwaysMoveStraightDown,
};
for (agent in agents) {
    //Select the first agent in the list
    currentAgentName = agent;
    break;
}

function handleGameRunnerStatusChange(stats) {
    scoreElement.innerHTML =
        'Agent: ' + currentAgentName +
        '\nCurrent Score: ' + stats.currentScore +
        '\nLast Game Final Score: ' + stats.lastGameScore +
        '\nActions per second: ' + stats.actionsPerSecond +
        '\nAvg Final Score: ' + (Math.floor(stats.lastFinalScores.reduce((acc, val) => acc + val, 0) / stats.lastFinalScores.length) || 0) +
        '\nGame Count: ' + stats.gameCount;
}

let agentSelectorElement = document.getElementById('agentSelector');
for (agent in agents) {
    const optionElement = document.createElement('option');
    optionElement.text = agent;
    optionElement.value = agent;
    agentSelectorElement.appendChild(optionElement)
}
agentSelectorElement.addEventListener('change', (event) => {
    currentAgentName = agentSelectorElement.value;
    document.getElementById('agentRendererContainer').innerHTML = '';
    gameRunner.clearStats();
    newGame()
});

let speedIntervalSelectElement = new SpeedIntervalSelectElement(setupInterval, newGame, renderer);

function setupInterval() {
    clearInterval(intervalReference);
    if (settings.autoPlay) {
        var ticksPerInterval = settings.ticksPerIntervalWhenNotRendering;
        if (settings.renderingEnabled) {
            ticksPerInterval = 1
        }
        //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
        intervalReference = setInterval(function () {
            for (let i = 0; i < ticksPerInterval; i++) {
                gameRunner.tick();
            }
        }, settings.speed);
    }
}

document.body.addEventListener('keydown', function (event) {
    gameRunner.takeAction(event.key);
});

function newGame() {
    gameRunner.newGame(agents[currentAgentName], settings.renderingEnabled);
}

newGame();
setupInterval();
