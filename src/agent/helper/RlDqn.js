import Agent from './DQN/Agent'
import {userSettings} from '../../index' //@TODO use DI instead for this

function getMinimumVectorIndex(w) {
    var minv = w[0];
    var minix = 0;
    for (var i = 1, n = w.length; i < n; i++) {
        var v = w[i];
        if (v < minv) {
            minix = i;
            minv = v;
        }
    }
    return minix;
}

// function maxi(w) {
//     var minv = w[0];
//     var minix = 0;
//     for (var i = 1, n = w.length; i < n; i++) {
//         var v = w[i];
//         if (v < minv) {
//             minix = i;
//             minv = v;
//         }
//     }
//     return minix;
// }

let actionElements = null;
let randomActionElement = null;
let rewardElements = null;

let currentAgent; //@TODO WARNING IS HUGE HACK

function ensureElementsExist() {
    if (document.getElementById('DQNRender')) {
        return;
    }
    document.getElementById('agentRendererContainer').innerHTML =
        `<div id="DQNRender">
    <br />Action Choice:
    <div style="overflow: auto"><div style="float: left">w:&nbsp;</div> <div id="action0" style="background-color: lightgoldenrodyellow;"></div></div>
    <div style="overflow: auto"><div style="float: left">a:&nbsp;</div> <div id="action1" style="background-color: lightsalmon"></div></div>
    <div style="overflow: auto"><div style="float: left">s:&nbsp;</div> <div id="action2" style="background-color: lightskyblue"></div></div>
    <div style="overflow: auto"><div style="float: left">d:&nbsp;</div> <div id="action3" style="background-color: lightseagreen"></div></div>
        <div style="overflow: auto"><div style="float: left">random action&nbsp;</div> <div id="actionRandom" style="background-color: lightcoral;height: 1em"></div></div>
        <br>
        Reward:
        <div style="overflow: auto"><div style="float: left">good&nbsp;</div> <div id="good" style="background-color: greenyellow"></div></div>
    <div style="overflow: auto"><div style="float: left">bad&nbsp;</div> <div id="bad" style="background-color: orangered"></div></div>
<br /><button id="dump-agent-internal-data">Dump Agent Internal Data</button>
</div>`;
    actionElements = [
        document.getElementById('action0'),
        document.getElementById('action1'),
        document.getElementById('action2'),
        document.getElementById('action3'),
    ];
    randomActionElement = document.getElementById('actionRandom');
    rewardElements = [
        document.getElementById('good'),
        document.getElementById('bad'),
    ];

    document.getElementById('dump-agent-internal-data').addEventListener('click', ()=> {
        if (!document.getElementById('q-learning-data')) {
            let div = document.createElement('div');
            let label = document.createElement('div');
            label.innerHTML = '<br/>Q Learner Internal State Dump';
            let textArea = document.createElement("TEXTAREA");
            textArea.style.width = '100%';
            textArea.style.height = '10em';
            textArea.setAttribute('id', 'q-learning-data');
            div.appendChild(label);
            div.appendChild(textArea);
            document.body.appendChild(div);
        }
        document.getElementById('q-learning-data').innerHTML = JSON.stringify(currentAgent.toJSON());
    });
}

function renderActionResponse(actionResponse) {
    ensureElementsExist();

    if (actionResponse.wasRandom) {
        // randomElement.innerHTML = 100;
        randomActionElement.style.width = (100 * 3 + 50) + 'px';
        for (i = 0; i < actionElements.length; i++) {
            var element = actionElements[i];
            element.innerHTML = 0;
            element.style.width = '50px';
        }
    } else {
        // randomElement.innerHTML = 0;
        randomActionElement.style.width = '10px';
        const minAction = getMinimumVectorIndex(actionResponse.weights);
        // const maxA = maxi(actionResponse.weights);
        const maxAction = actionResponse.action;
        for (var i = 0, len = actionResponse.weights.length; i < len; i++) {
            let adder = 0;
            if (actionResponse.weights[minAction] < 0) {
                adder = -actionResponse.weights[minAction];
            }
            let fixedValue = Math.floor((actionResponse.weights[i] + adder) / (actionResponse.weights[maxAction] + adder) * 100);

            actionElements[i].style.width = (fixedValue * 3 + 50) + 'px';
            actionElements[i].innerHTML = fixedValue;
        }
    }
}

function renderReward(reward) {
    let good = 0;
    let bad = 0;
    if (reward < 0) {
        bad = -reward;
    } else {
        good = reward;
    }

    rewardElements[0].style.width = (good * 15 + 50) + 'px';
    rewardElements[0].innerHTML = good;

    rewardElements[1].style.width = (bad * 15 + 50) + 'px';
    rewardElements[1].innerHTML = bad;
}

export default class RlDqn {
    constructor(learningEnabled, numberOfStates, previousSavedData) {
        // create the DQN agent
        var spec = {alpha: 0.01}; // see full options on DQN page
        this._agent = new Agent(numberOfStates, 4, spec);
        if (typeof previousSavedData !== 'undefined') {
            this._agent.fromJSON(previousSavedData);
        }

        this._learningEnabled = learningEnabled;
    }

    getAction(state, reward) {
        currentAgent = this._agent;

        if (this._learningEnabled) {
            if (reward !== null) {
                this._agent.learn(reward);
                if (userSettings.renderingEnabled) {
                    renderReward(reward)
                }
            }
        }
        let actionResponse = this._agent.act(state);

        if (userSettings.renderingEnabled) {
            renderActionResponse(actionResponse);
        }

        return actionResponse.action;
    }
}
