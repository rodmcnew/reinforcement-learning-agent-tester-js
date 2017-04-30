import './deep-q-network/runTests'
import HtmlTableRenderer from './renderer/HtmlTableRenderer'
import LookAheadIn9x3Viewport from './agent/hand-programmed/LookAheadIn9x3Viewport'
import LookAheadIn3x2Viewport from './agent/hand-programmed/LookAheadIn3x2Viewport'
// import LookAheadDeep from './agent/hand-programmed/LookAheadDeep'
// import AlwaysMoveStraightDown from './agent/hand-programmed/AlwaysMoveStraightDown'
import LookAheadIn5x2Viewport from './agent/hand-programmed/LookAheadIn5x2Viewport'
import OneStepDeepQNetwork_PreTrained from './agent/machine-learning/OneStepDeepQNetwork_PreTrained'
import Tabular_Q_Learner from './agent/machine-learning/Tabular_Q_Learner'
import './index.html'
import GameRunner from './GameRunner'
import SpeedIntervalSelectElement from './SpeedIntervalSelectElement'
import Chart from 'chart.js'
let chartGameCount = 200;

export const settings = {
    renderingEnabled: true,
    speed: 0,
    // renderingEnabled: true,
    // speed: 250,
    ticksPerIntervalWhenNotRendering: 100, //100000,//100 is good for speed, 10 is good for precise "actions per second" readout
    autoPlay: true,
};

var ctx = document.getElementById("learningChart");
let learningChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Average Score',
                data: [],
                backgroundColor: 'transparent',
                borderColor: 'blue',
                borderWidth: 1,
                lineTension: 0
            },
            {
                label: 'Score',
                data: [],
                backgroundColor: 'transparent',
                borderColor: 'lightgrey',
                borderWidth: 1,
                lineTension: 0
            },
        ]
    },
    options: {
        animation: {
            duration: 0
        },
        // maintainAspectRatio: false,
        elements: {point: {radius: 0}},
        scales: {
            yAxes: [{
                ticks: {
                    // beginAtZero: true
                    min:0,
                    max:300
                }
            }],
            xAxes: [{
                // afterTickToLabelConversion: function (data) {
                //
                //
                //     var xLabels = data.ticks;
                //
                //     xLabels.forEach(function (labels, i) {
                //         if (i % (chartGameCount / 10) !== 0) {
                //             xLabels[i] = null;
                //         }
                //     });
                // },
                display: false
            }]
        }
    }
});


const scoreElement = document.getElementById('score');

let intervalReference = null;
let agent;
let currentAgentName;
let renderer = new HtmlTableRenderer(document.getElementById('rendererContainer'));

let gameRunner = new GameRunner(renderer, handleGameRunnerStatusChange);

let agents = {
    'MachineLearning - Tabular_Q_Learner': Tabular_Q_Learner,
    'MachineLearning - OneStepDeepQNetwork_PreTrained - ranked 192': OneStepDeepQNetwork_PreTrained,
    'HandProgrammed - LookAheadIn9x3Viewport - ranked 241': LookAheadIn9x3Viewport,
    'HandProgrammed - LookAheadIn5x2Viewport - ranked 224': LookAheadIn5x2Viewport,
    'HandProgrammed - LookAheadIn3x2Viewport - ranked 208': LookAheadIn3x2Viewport,
    // 'HandProgrammed - LookAheadDeep - ranked 235': LookAheadDeep,
    // 'HandProgrammed - AlwaysMoveStraightDown - ranked 80': AlwaysMoveStraightDown,
};
for (agent in agents) {
    //Select the first agent in the list
    currentAgentName = agent;
    break;
}

let gameCountToScore = [];

function handleGameRunnerStatusChange(stats) {

    scoreElement.innerHTML =
        // 'Agent: ' + currentAgentName +
        '\nCurrent Score: ' + stats.currentScore +
        '\nLast Game Final Score: ' + stats.lastGameScore +
        '\nActions per second: ' + stats.actionsPerSecond +
        '\nAvg Final Moving Average: ' + stats.averageFinalScore +
        '\nFinal Score Average: ' + Math.floor(stats.scoreSum / stats.gameCount) +
        '\nGame Count: ' + stats.gameCount;

    // if (stats.gameCount < chartGameCount) {
    learningChart.data.datasets[0].data = stats.gameCountToAverageScore.slice(-1 * chartGameCount);
    learningChart.data.datasets[1].data = stats.gameCountToScore.slice(-1 * chartGameCount);
    learningChart.data.labels = Object.keys(stats.gameCountToScore).slice(-1 * chartGameCount);
    for (var i = 0, len = learningChart.data.labels.length; i < len; i++) {
        if (i % 10 != 0) {
            learningChart.data.labels[i] = '';
        }
    }
    learningChart.update();
    // }
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
    clearStatsAndNewGame()
});

let speedIntervalSelectElement = new SpeedIntervalSelectElement(setupInterval, gameRunner.setRenderingEnabled, renderer);

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

function clearStatsAndNewGame() {
    gameRunner.setRenderingEnabled(settings.renderingEnabled);
    gameRunner.clearStats();
    gameRunner.newGame(agents[currentAgentName], settings.renderingEnabled);
}


document.getElementById('clearBrainButton').addEventListener('click', ()=> {
    gameRunner.clearCurrentAgentBrain();
    clearStatsAndNewGame();
});

clearStatsAndNewGame();
setupInterval();
