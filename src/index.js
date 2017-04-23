import HtmlTableRenderer from './renderer/HtmlTableRenderer'
import ColumnCompare from './agent/ColumnCompare'
import LookAheadWide from './agent/LookAheadWide'
import LookAheadWideAndDeep from './agent/LookAheadWideAndDeep'
import AlwaysDown from './agent/AlwaysDown'
import RL_DQN_5X5Viewport_In_Learning_Mode from './agent/RL_DQN_5X5Viewport_In_Learning_Mode'
import BarelyLookAhead from './agent/BarelyLookAhead'
import RL_DQN_5X5Viewport_PreTrained from './agent/RL_DQN_5X5Viewport_PreTrained'
import {config as environmentConfig} from './environment'
import GameRunner from './GameRunner'

// import ReinforcementLearnerDeepQNetworkPreTrained from './agent/ReinforcementLearnerDeepQNetworkPreTrained'
import './style.css'

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
    '<div id="rendererContainer"></div>'+
    '<pre>' +
    '\nGame Rules:' +
    '\n- Gain ' + environmentConfig.pointsForCompletion + ' points for making it to the bottom row' +
    '\n- Gain ' + environmentConfig.verticalDeltaScore + ' points for every row lower you go' +
    '\n- Loose ' + environmentConfig.verticalDeltaScore + ' points for every row higher you go' +
    '\n- Loose ' + -environmentConfig.tileValueMap[1] + ' points when moving into a red square' +
    '\n- Loose ' + -environmentConfig.tileValueMap[0] + ' points when moving into a grey square' +
    '</pre>';
const scoreElement = document.getElementById('score');

let enableRendering = true;
let autoPlay = true;
let speed = 250;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new HtmlTableRenderer(document.getElementById('rendererContainer'));

let gameRunner = new GameRunner(renderer, handleGameRunnerStatusChange);

let agents = {
    'LookAheadWideAndDeep - ranked 334': LookAheadWideAndDeep,
    'RL_DQN_5X5Viewport_PreTrained - ranked 201': RL_DQN_5X5Viewport_PreTrained,
    'RL_DQN_5X5Viewport_In_Learning_Mode': RL_DQN_5X5Viewport_In_Learning_Mode,
    'LookAheadWide - ranked 330': LookAheadWide,
    'ColumnCompare - ranked 308': ColumnCompare,
    'BarelyLookAhead - ranked 292': BarelyLookAhead,
    'AlwaysDown - ranked 180': AlwaysDown,
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
    if (newEnableRenderingValue != enableRendering) {
        enableRendering = newEnableRenderingValue;
        newGame();
    }
    setupInterval();
});

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        if (enableRendering) {
            intervalReference = setInterval(gameRunner.tick, speed);
        } else {
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 100 times
            intervalReference = setInterval(function () {
                for (let i = 0; i < 100; i++) {
                    gameRunner.tick();
                }
            }, 0);
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    gameRunner.takeAction(event.key);
    // if (enableRendering) {
    //     const agentObservation = environment.getAgentObservation();
    //     renderer.render(agentObservation, environment.getGodObservation());
    // }
});

function newGame() {
    gameRunner.newGame(new agents[currentAgentName], enableRendering);
}

newGame();
setupInterval();
