import Environment from './environment'
import HtmlTableRenderer from './renderer/HtmlTableRenderer'
import LookFourAdjacentOneDown from './agent/LookFourAdjacentOneDown'
import LookThreeAdjacentTwoDown from './agent/LookThreeAdjacentTwoDown'
import LookThreeAdjacentThreeDown from './agent/LookThreeAdjacentThreeDown'
import LateralWallBouncer from './agent/LateralWallBouncer'
import AlwaysDown from './agent/AlwaysDown'
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
    '<pre>' +
    '\nGame Rules:' +
    '\n- Gain 4 points for every row lower you go' +
    '\n- Loose 4 points for every row higher you go' +
    '\n- Loose 9 points any time you move in a red square' +
    '\n- Get to the bottom row to complete the game' +
    '</pre>' +
    '</div>' +
    '<div id="rendererContainer"></div>';
const scoreElement = document.getElementById('score');

let enableRendering = true;
let autoPlay = true;
let environment;
let scoreSum = 0;
let gameCount = 0;
let lastGameScore = 0;
let speed = 250;
let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new HtmlTableRenderer(document.getElementById('rendererContainer'));


let agents = {
    'LookThreeAdjacentThreeDown - ranked 103': LookThreeAdjacentThreeDown,
    'LookThreeAdjacentTwoDown - ranked 101': LookThreeAdjacentTwoDown,
    'LookFourAdjacentOneDown - ranked 94': LookFourAdjacentOneDown,
    'LateralWallBouncer - ranked 78': LateralWallBouncer,
    'AlwaysDown - ranked 29': AlwaysDown,
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

function renderScore(score) {
    scoreElement.innerHTML =
        'Agent: ' + currentAgentName +
        '\nCurrent Score: ' + score +
        '\nLast Game Final Score: ' + lastGameScore +
        '\nAvg Final Score: ' + (Math.round(scoreSum / gameCount) || 0) +
        '\nGame Count: ' + gameCount;
}

function newGame() {
    environment = new Environment();

    agent = new agents[currentAgentName];

    if (enableRendering) {
        //@TODO have this render make the table its self inside a given div
        renderer.clear();
        renderer.render(environment.getAgentObservation(), environment.getGodObservation());
    } else {
        renderScore(0);//Makes score show up between games when rendering is disabled
    }
}

function takeAction(actionCode, agentObservation) {
    environment.applyAction(actionCode);
    let godObservation = environment.getGodObservation();

    if (godObservation.isComplete) {//@Find better way to communicate "isComplete"
        lastGameScore = agentObservation.score;
        scoreSum += agentObservation.score;
        gameCount += 1;
        newGame();
    }

    if (enableRendering) {
        renderer.render(agentObservation, godObservation);
        renderScore(agentObservation.score);
    }
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
    clearHistory();
    newGame();
});

document.getElementById('interval').addEventListener('change', (event) => {
    const value = event.target.value;
    enableRendering = true;
    autoPlay = true;
    if (value === 'no-render') {
        enableRendering = false;
        speed = 0;
        renderer.clear();
    } else if (value === 'paused') {
        autoPlay = false;
    } else {
        speed = value;
    }
    setupInterval();
});

function tick() {
    const agentObservation = environment.getAgentObservation(environment);
    const action = agent.getAction(agentObservation);
    takeAction(action, agentObservation);
}

function setupInterval() {
    clearInterval(intervalReference);
    if (autoPlay) {
        if (enableRendering) {
            intervalReference = setInterval(tick, speed);
        } else {
            //Normal ticking takes 3ms between ticks which is not fast enough, so tick 1000 times
            intervalReference = setInterval(function () {
                for (let i = 0; i < 1000; i++) {
                    tick();
                }
            }, 0);
        }
    }
}

document.body.addEventListener('keydown', function (event) {
    takeAction(event.key,environment.getAgentObservation(environment));
});

newGame();
setupInterval();
