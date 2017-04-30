import {config as environmentConfig} from './environment'
import './style.css'

export const html = `
<div id="info">Agent: <select id="agentSelector"></select>&nbsp;<button id="clearBrainButton">Clear Brain and Relearn</button>
<br>Speed: <select id="interval">
<option value="no-render">Ludicrous Speed (no rendering)</option>
<option value="0">Light Speed</option>
<option value="100">Fast (10 actions per second)</option>
<option value="250">Medium (4 actions per second)</option>
<option value="500">Slow (2 actions per second)</option>
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
- Gain ` + environmentConfig.pointsForCompletion + ` points for getting to the bottom row
- Gain ` + environmentConfig.verticalDeltaScore + ` points for every row lower you go
- Loose ` + environmentConfig.verticalDeltaScore + ` points for every row higher you go
- Loose ` + -environmentConfig.tileValueMap[1] + ` points when moving into a red square
- Loose ` + -environmentConfig.tileValueMap[0] + ` points when moving into a grey square
</pre>`;

document.body.innerHTML = html;