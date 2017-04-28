import {config as environmentConfig} from './environment'
import './style.css'

export default `
<div id="info">Agent: <select id="agentSelector"></select>
<br>Speed Interval: <select id="interval">
<option value="no-render">0ms with no rendering</option>
<option value="0">0ms</option>
<option value="100">100ms</option>
<option value="200">200ms</option>
<option value="250">250ms</option>
<option value="500">500ms</option>
<option value="1000">1000ms</option>
<option value="paused">Paused</option>
</select>
<pre id="score"></pre>
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
