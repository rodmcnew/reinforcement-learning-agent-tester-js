import {config as environmentConfig} from './environment'
import './style.css'

export const html = `
<div id="info">Agent: <select id="agentSelector"></select>&nbsp;<button id="clearBrainButton">Clear Brain and Retrain</button>
<br>Speed: <select id="interval">
<option value="no-render">Ludicrous Speed (no rendering)</option>
<option value="0">Very Fast</option>
<option value="100">Fast</option>
<option value="250">Medium</option>
<option value="500">Slow</option>
<!--<option value="1000">Slow - 1000ms</option>-->
<option value="paused">Paused</option>
</select>
<pre id="score"></pre>
</div>
<div style="width:30em">
<canvas id="learningChart" height="100"></canvas>
</div>
<div id="rendererContainer"></div>
<div id="agentRendererContainer"></div>
<pre>
Game Rules:
- Get to the bottom row to finish the game
- Gain ` + environmentConfig.verticalDeltaScore + ` points for every row lower you go
- Loose ` + environmentConfig.verticalDeltaScore + ` points for every row higher you go
- Loose ` + -environmentConfig.tileValueMap[1] + ` points when moving into a red square
</pre><button id="exportAgentBrain">Export Agent Brain</button>`;
// ` + (environmentConfig.pointsForCompletion !== 0 ? `- Gain ` + environmentConfig.pointsForCompletion + ` points for getting to the bottom row` : '') + `
// ` + (environmentConfig.tileValueMap[0] !== 0 ? `- Loose ` + -environmentConfig.tileValueMap[0] + ` points when moving into a grey square` : '') + `


document.body.innerHTML = html;