import HtmlTableRenderer from './renderer/HtmlTableRenderer'
import ColumnCompare from './agent/ColumnCompare'
import LookAheadWide from './agent/LookAheadWide'
import LookAheadWideAndDeep from './agent/LookAheadWideAndDeep'
import AlwaysDown from './agent/AlwaysDown'
import RL_DQN_5X5TrimmedViewport_InLearningMode from './agent/RL_DQN_5X5TrimmedViewport_InLearningMode'
import BarelyLookAhead from './agent/BarelyLookAhead'
import RL_DQN_5X5TrimmedViewport_PreTrained from './agent/RL_DQN_5X5TrimmedViewport_PreTrained'
import RL_DQN_InLearningMode from './agent/RL_DQN_InLearningMode'
import RL_DQN_PreTrained from './agent/RL_DQN_PreTrained'
import {config as environmentConfig} from './environment'
import GameRunner from './GameRunner'

// import ReinforcementLearnerDeepQNetworkPreTrained from './agent/ReinforcementLearnerDeepQNetworkPreTrained'
import './style.css'

export const userSettings = {
    renderingEnabled: true
};

document.body.innerHTML =
    '<div id="info">Agent: <select id="agentSelector"></select>' +
    '<br>Speed Interval: <select id="interval">' +
    '<option value="no-render">0ms with no rendering</option>' +
    '<option value="0">0ms</option>' +
    '<option value="100">100ms</option>' +
    '<option value="200">200ms</option>' +
    '<option value="250" selected>250ms</option>' +
    '<option value="500">500ms</option>' +
    '<option value="1000">1000ms</option>' +
    '<option value="paused">Paused</option>' +
    '</select>' +
    '<pre id="score"></pre>' +
    '</div>' +
    '<div id="rendererContainer"></div>' +
    '<div id="agentRendererContainer"></div>' +
    '<pre>' +
    '\nGame Rules:' +
    // '\n- Gain ' + environmentConfig.pointsForCompletion + ' points for making it to the bottom row' +
    '\n- Gain ' + environmentConfig.verticalDeltaScore + ' points for every row lower you go' +
    '\n- Loose ' + environmentConfig.verticalDeltaScore + ' points for every row higher you go' +
    '\n- Loose ' + -environmentConfig.tileValueMap[1] + ' points when moving into a red square' +
    '\n- Loose ' + -environmentConfig.tileValueMap[0] + ' points when moving into a grey square' +
    '</pre>';
const scoreElement = document.getElementById('score');

let autoPlay = true;
let speed = 250;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new HtmlTableRenderer(document.getElementById('rendererContainer'));

let gameRunner = new GameRunner(renderer, handleGameRunnerStatusChange);

let agents = {
    'RL_DQN_PreTrained - ranked 192': RL_DQN_PreTrained,
    'RL_DQN_InLearningMode': RL_DQN_InLearningMode,
    'RL_DQN_5X5TrimmedViewport_PreTrained - ranked 192': RL_DQN_5X5TrimmedViewport_PreTrained,
    'RL_DQN_5X5TrimmedViewport_InLearningMode': RL_DQN_5X5TrimmedViewport_InLearningMode,
    'LookAheadWideAndDeep - ranked 234': LookAheadWideAndDeep,
    'LookAheadWide - ranked 230': LookAheadWide,
    'ColumnCompare - ranked 208': ColumnCompare,
    'BarelyLookAhead - ranked 192': BarelyLookAhead,
    'AlwaysDown - ranked 80': AlwaysDown,
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
        '\nAvg Final Score: ' + (Math.round(stats.scoreSum / stats.gameCount) || 0) +
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

document.getElementById('interval').addEventListener('change', (event) => {
    const value = event.target.value;
    let newEnableRenderingValue = true;
    autoPlay = true;
    if (value === 'no-render') {
        newEnableRenderingValue = false;
        speed = 0;
        renderer.clear();
    } else if (value === 'paused') {
        autoPlay = false;
    } else {
        speed = value;
    }
    if (newEnableRenderingValue != userSettings.renderingEnabled) {
        userSettings.renderingEnabled = newEnableRenderingValue;
        newGame();
    }
    setupInterval();
});

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        if (userSettings.renderingEnabled) {
            intervalReference = setInterval(gameRunner.tick, speed);
        } else {
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
            intervalReference = setInterval(function () {
                for (let i = 0; i < 200; i++) {
                    gameRunner.tick();
                }
            }, 0);
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    gameRunner.takeAction(event.key);
    // if (userSettings.renderingEnabled) {
    //     const agentObservation = environment.getAgentObservation();
    //     renderer.render(agentObservation, environment.getGodObservation());
    // }
});

function newGame() {
    gameRunner.newGame(agents[currentAgentName], userSettings.renderingEnabled);
}

newGame();
setupInterval();
