import {State} from '../environment'
import './HtmlTable.css'

export default function HtmlTable(containerElement) {
    let previousPositions = [];
    /**
     * Render the current state of the environment in HTML
     *
     * @param {State} state
     */
    this.render = function (state) {
        let html = '';
        for (let yi = 0; yi < state.size; yi++) {
            html += '<tr>';
            for (let xi = 0; xi < state.size; xi++) {
                let backColorRed = state.costs[xi][yi] === 0 ? 0 : 230;
                let backColorGreen = 0;
                if (previousPositions[xi + ',' + yi]) {
                    backColorGreen = 128;
                }
                if (xi == state.position.x && yi == state.position.y) {
                    backColorGreen = 255;
                    backColorRed = 0;
                }
                html += '<td style="background-color: rgb(' + backColorRed + ',' + backColorGreen + ',0);"></td>';
            }
            html += '</tr>';
        }
        previousPositions[state.position.x + ',' + state.position.y] = true;

        containerElement.innerHTML = '<table class="InfectionGameHtmlTableRender">' + html + '</table>';
    }
}
