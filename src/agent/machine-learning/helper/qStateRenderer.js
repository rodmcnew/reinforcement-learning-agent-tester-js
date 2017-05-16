let actionElements = null;
let randomActionElement = null;
let rewardElements = null;
let randomActionValueElement;


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
    const barFrontPadding = 100;
    const maxActionValue = 1;//actionResponse.weights[maxAction];

    const minActionValue = -1;
    for (var i = 0, len = actionResponse.weights.length; i < len; i++) {
        let fixedValue = (actionResponse.weights[i] - minActionValue);
        if (fixedValue < minActionValue) {
            fixedValue = 0;
        } else if (fixedValue > maxActionValue * 2) {
            fixedValue = maxActionValue * 2;
        }
        actionElements[i].style.width = (fixedValue * 150 + barFrontPadding) + 'px';
        actionElements[i].innerHTML = (actionResponse.weights[i] * 100).toFixed(0);
    }

    if (actionResponse.wasRandom) {
        randomActionValueElement.innerHTML = 'Infinity';
        randomActionElement.style.width = (3 * 150 + barFrontPadding) + 'px';
    } else {
        randomActionValueElement.innerHTML = '0';
        randomActionElement.style.width = '10px';
    }
}

export function renderReward(reward) {//@TODO move out
    ensureElementsExist();
    reward *= 100;
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
