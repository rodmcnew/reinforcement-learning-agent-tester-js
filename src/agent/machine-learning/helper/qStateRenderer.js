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
function getMaximumVectorIndex(w) {
    //@TODO fix var names
    var minv = w[0];
    var minix = 0;
    for (var i = 1, n = w.length; i < n; i++) {
        var v = w[i];
        if (v > minv) {
            minix = i;
            minv = v;
        }
    }
    return minix;
}


let actionElements = null;
let randomActionElement = null;
let rewardElements = null;
let randomActionValueElement;

// let currentNeuralNetwork; //@TODO WARNING IS HUGE HACK

function ensureElementsExist() {
    if (document.getElementById('DQNRender') && actionElements !== null) {
        return;
    }
    document.getElementById('agentRendererContainer').innerHTML =
        `<div id="DQNRender">
Predicted expected reward from each action:
    <div style="overflow: auto"><div style="float: left">w:&nbsp;</div> <div id="action0" style="background-color: lightgoldenrodyellow"></div></div>
    <div style="overflow: auto"><div style="float: left">a:&nbsp;</div> <div id="action1" style="background-color: lightsalmon"></div></div>
    <div style="overflow: auto"><div style="float: left">s:&nbsp;</div> <div id="action2" style="background-color: lightskyblue"></div></div>
    <div style="overflow: auto"><div style="float: left">d:&nbsp;</div> <div id="action3" style="background-color: lightseagreen"></div></div>
        <div style="overflow: auto"><div style="float: left">random action:&nbsp;<span id="actionRandomValue"></span></div><div id="actionRandom" style="background-color: lightcoral;height: 1em"></div></div>
        <br>
        Reward from last action:
        <div style="overflow: auto"><div style="float: left">good&nbsp;</div> <div id="good" style="background-color: greenyellow"></div></div>
    <div style="overflow: auto"><div style="float: left">bad&nbsp;</div> <div id="bad" style="background-color: orangered"></div></div>
<br />
</div>`;
    actionElements = [
        document.getElementById('action0'),
        document.getElementById('action1'),
        document.getElementById('action2'),
        document.getElementById('action3'),
    ];
    randomActionElement = document.getElementById('actionRandom');
    randomActionValueElement = document.getElementById('actionRandomValue');
    rewardElements = [
        document.getElementById('good'),
        document.getElementById('bad'),
    ];
}

export function renderActionResponse(actionResponse) {//@TODO move out
    ensureElementsExist();

    if (actionResponse.weights === null) {//Make it work with older agents that do not always return weights //@TODO fix
        return;
    }

    const minAction = getMinimumVectorIndex(actionResponse.weights);
    // const maxA = maxi(actionResponse.weights);
    const maxAction = getMaximumVectorIndex(actionResponse.weights);
    const barFrontPadding = 50;

    let adder = 0;
    const maxActionValue = actionResponse.weights[maxAction];
    for (var i = 0, len = actionResponse.weights.length; i < len; i++) {
        if (actionResponse.weights[minAction] < 0) {
            adder = -actionResponse.weights[minAction];
        }

    }
    for (i = 0, len = actionResponse.weights.length; i < len; i++) {
        let fixedValue = Math.floor((actionResponse.weights[i] + adder) / (maxActionValue + adder) * 100);

        actionElements[i].style.width = (fixedValue * 3 + barFrontPadding) + 'px';
        actionElements[i].innerHTML = actionResponse.weights[i].toFixed(0);
    }

    if (actionResponse.wasRandom) {
        randomActionValueElement.innerHTML = 'Infinity';
        const fixedValueForRandomAction = Math.floor((maxActionValue + adder + 2) / (maxActionValue + adder) * 100);
        randomActionElement.style.width = (fixedValueForRandomAction * 3 + barFrontPadding) + 'px';
    } else {
        randomActionValueElement.innerHTML = '0';
        randomActionElement.style.width = '10px';
    }
}

export function renderReward(reward) {//@TODO move out
    ensureElementsExist();
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