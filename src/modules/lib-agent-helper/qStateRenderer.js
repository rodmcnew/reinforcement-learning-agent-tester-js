let actionElements = null;
let randomActionElement = null;
let rewardElements = null;
let randomActionValueElement;

//@TODO move to react or canvas or chart lib?
//@TODO somehow show where the dynamic section of the bar starts?
// function ensureElementsExist() {
//     if (document.getElementById('DQNRender') && actionElements !== null) {
//         return;
//     }
//     document.getElementById('agentRendererContainer').innerHTML =
//         `<div id="DQNRender">
// Predicted expected reward from each action:
//     <div style="overflow: auto"><div style="float: left">w:&nbsp;</div> <div id="action0" style="background-color: lightgoldenrodyellow"></div></div>
//     <div style="overflow: auto"><div style="float: left">a:&nbsp;</div> <div id="action1" style="background-color: lightsalmon"></div></div>
//     <div style="overflow: auto"><div style="float: left">s:&nbsp;</div> <div id="action2" style="background-color: lightskyblue"></div></div>
//     <div style="overflow: auto"><div style="float: left">d:&nbsp;</div> <div id="action3" style="background-color: lightseagreen"></div></div>
//         <div style="overflow: auto"><div style="float: left">random action:&nbsp;<span id="actionRandomValue"></span></div><div id="actionRandom" style="background-color: lightcoral;height: 1em"></div></div>
//         <br>
//         Reward from last action:
//         <div style="overflow: auto"><div style="float: left">good&nbsp;</div> <div id="good" style="background-color: greenyellow"></div></div>
//     <div style="overflow: auto"><div style="float: left">bad&nbsp;</div> <div id="bad" style="background-color: orangered"></div></div>
// <br />
// </div>`;
//     actionElements = [
//         document.getElementById('action0'),
//         document.getElementById('action1'),
//         document.getElementById('action2'),
//         document.getElementById('action3'),
//     ];
//     randomActionElement = document.getElementById('actionRandom');
//     randomActionValueElement = document.getElementById('actionRandomValue');
//     rewardElements = [
//         document.getElementById('good'),
//         document.getElementById('bad'),
//     ];
// }

const lineHeight = 15;
const lengthMultiplier = 100
const lineCount = 10;
const canvasHeight = lineHeight * lineCount;

export function renderActionResponse(actionResponse) {//@TODO move out
    // ensureElementsExist();
    const maxActionValue = 1;//actionResponse.weights[maxAction];
    // const barFrontPadding = 100;
    // const multiplier = 150;

    const canvas = document.getElementById('agentRendererCanvas');
    const ctx = canvas.getContext('2d');

    if (canvas.height !== canvasHeight) {
        canvas.height = canvasHeight;
    }

    ctx.clearRect(0, 0, canvas.width, lineHeight * 7);
    const renderBar = (lineNumber, length, color, label) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, lineNumber * lineHeight, length * lengthMultiplier, lineHeight);
        ctx.fillStyle = 'black';
        ctx.fillText(label, 3, (lineNumber + 1) * lineHeight - 4)
    }

    renderBar(0, 0, 'white', 'Predicted expected reward from each action:')

    const colors = ['lightgoldenrodyellow', 'lightsalmon', 'lightskyblue', 'lightseagreen'];
    const labels = ['w', 'a', 's', 'd']

    const minActionValue = -1;
    for (var i = 0, len = actionResponse.weights.length; i < len; i++) {
        const value = actionResponse.weights[i]
        let fixedValue = (value - minActionValue);
        if (fixedValue < minActionValue) {
            fixedValue = 0;
        } else if (fixedValue > maxActionValue * 2) {
            fixedValue = maxActionValue * 2;
        }
        fixedValue += 1
        // actionElements[i].style.width = (fixedValue * multiplier + barFrontPadding) + 'px';
        // actionElements[i].innerHTML = value.toFixed(3);
        renderBar(i + 1, fixedValue, colors[i], labels[i] + ': ' + value.toFixed(3))
    }

    if (actionResponse.wasRandom) {
        // randomActionValueElement.innerHTML = 'Infinity';
        // randomActionElement.style.width = (3 * multiplier + barFrontPadding) + 'px';
        renderBar(5, 3, 'lightcoral', 'random: Infinity')
    } else {
        // randomActionValueElement.innerHTML = '0';
        // randomActionElement.style.width = '10px';
        renderBar(5, 0, 'lightcoral', 'random: 0')
    }
}

export function renderReward(reward) {//@TODO move out
    const canvas = document.getElementById('agentRendererCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, lineHeight * 7, canvas.width, canvas.height);
    const renderBar = (lineNumber, length, color, label) => { //@TODO don't duplicate this code with the version above
        ctx.fillStyle = color;
        ctx.fillRect(0, lineNumber * lineHeight, length * lengthMultiplier, lineHeight);
        ctx.fillStyle = 'black';
        ctx.fillText(label, 3, (lineNumber + 1) * lineHeight - 4)
    }

    renderBar(7, 0, 'white', 'Reward from last action:')

    // const barFrontPadding = 100;
    const multiplier = 30;

    // ensureElementsExist();
    // reward *= 100;
    let good = 0;
    let bad = 0;
    if (reward < 0) {
        bad = -reward;
    } else {
        good = reward;
    }

    renderBar(8, good * multiplier, 'greenyellow', `good: ${good}`)
    // rewardElements[0].style.width = (good * multiplier + barFrontPadding) + 'px';
    // rewardElements[0].innerHTML = good.toFixed(3);

    renderBar(9, bad * multiplier, 'orangered', `bad: ${bad}`)
    // rewardElements[1].style.width = (bad * multiplier + barFrontPadding) + 'px';
    // rewardElements[1].innerHTML = bad.toFixed(3);
}
