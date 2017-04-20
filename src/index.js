import {generateInitialState, applyAction, getObservation} from './environment'
import HtmlTable from './renderer/HtmlTable'
import lookAheadFiveActions from './agent/lookAheadFiveActions'
import alwaysDown from './agent/alwaysDown'
import lateralWallBouncer from './agent/lateralWallBouncer'
import lookAheadOneRowOneAdjacent from './agent/lookAheadOneRowOneAdjacent'
import lookAheadOneRowTenAdjacent from './agent/lookAheadOneRowTenAdjacent'
import './style.css'

let enableRendering = true;
let autoPlay = true;
let environmentState;
let agent;
let renderer;
let scoreSum = 0;
let gameCount = 0;
let lastGameScore = 0;
let speed = 200;
let intervalReference = null;
let agentState = {};
let currentAgentName;

let agents = {
    'lookAheadFiveActions - 91': lookAheadFiveActions,
    'lookAheadOneRowTenAdjacent - 86': lookAheadOneRowTenAdjacent,
    'lookAheadOneRowOneAdjacent - 72': lookAheadOneRowOneAdjacent,
    'lateralWallBouncer - 64': lateralWallBouncer,
    'alwaysDown - 22': alwaysDown,
};
for (agent in agents) {
    //Select the first agent in the list
    currentAgentName = agent;
    break;
}

function clearHistory() {
    gameCount = 0;
    lastGameScore = 0;
    scoreSum = 0;
}

function newGame() {
    environmentState = generateInitialState({size: 32});
    agentState = null;

    agent = agents[currentAgentName];

    if (enableRendering) {
        //@TODO have this render make the table its self inside a given div
        renderer = new HtmlTable(document.getElementById('rendererContainer'));
        renderer.render(environmentState);
    }
}

function getAgentAction() {
    const observation = getObservation(environmentState);
    const agentResponse = agent(observation, agentState);
    agentState = agentResponse.state;
    return agentResponse.action;
}

function takeAction(actionCode) {
    environmentState = applyAction(environmentState, actionCode);
    if (enableRendering) {
        renderer.render(environmentState);
    }
    if (environmentState.isComplete) {//@Find better way to communicate "isComplete"
        lastGameScore = environmentState.score;
        scoreSum += environmentState.score;
        gameCount += 1;
        newGame();
    }

    document.getElementById('score').innerHTML =
        'Agent: ' + currentAgentName +
        '\nCurrent Score: ' + environmentState.score +
        '\nLast Game Final Score: ' + lastGameScore +
        '\nAvg Final Score: ' + (Math.round(scoreSum / gameCount) || 0) +
        '\nGame Count: ' + gameCount;
}

document.body.innerHTML =
    '<div id="info">Agent: <select id="agentSelector"></select>' +
    '<br>Speed Interval: <select id="interval">' +
    '<option value="no-render" selected>0ms with no rendering</option>' +
    '<option value="0" selected>0ms</option>' +
    '<option value="100">100ms</option>' +
    '<option value="200" selected>200ms</option>' +
    '<option value="500">500ms</option>' +
    '<option value="1000">1000ms</option>' +
    '<option value="paused">Paused</option>' +
    '</select>' +
    '<pre id="score"></pre>' +
    '<pre>' +
    '\nGame Rules:' +
    '\n- Gain 4 points for every row lower you go' +
    '\n- The number on a square is how many points\n  will be lost by moving into it' +
    '\n- Get to the bottom row to complete the game' +
    '</pre>' +
    '</div>' +
    '<div id="rendererContainer"></div>';

let agentSelectorElement = document.getElementById('agentSelector');
for (agent in agents) {
    const optionElement = document.createElement('option');
    optionElement.text = agent;
    optionElement.value = agent;
    agentSelectorElement.appendChild(optionElement)
}
agentSelectorElement.addEventListener('change', (event)=> {
    currentAgentName = agentSelectorElement.value;
    clearHistory();
    newGame();
});

document.getElementById('interval').addEventListener('change', (event)=> {
    const value = event.target.value;
    enableRendering = true;
    autoPlay = true;
    if (value === 'no-render') {
        enableRendering = false;
        speed = 0;
        document.getElementById('rendererContainer').innerHTML = '';
    } else if (value === 'paused') {
        autoPlay = false;
    } else {
        speed = value;
    }
    setupInterval();
});

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        intervalReference = setInterval(function () {
            takeAction(getAgentAction());
        }, enableRendering ? speed : 0);
    }
}

document.body.addEventListener('keydown', function (event) {
    takeAction(event.key);
});

newGame();
setupInterval();