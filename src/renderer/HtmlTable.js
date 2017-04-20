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
                let height = state.costs[xi][yi];
                let backColorRed = Math.round(height * 255 / 10);
                // let colorRed = backColorRed;
                let colorRed = backColorRed < 128 ? 255 : 0;
                let colorGreen = 0;
                let backColorGreen = 0;
                if (previousPositions[xi + ',' + yi]) {
                    backColorGreen = 128;
                    colorRed = 0;
                    colorGreen = 255;
                }
                if (xi == state.position.x && yi == state.position.y) {
                    colorGreen = 0;
                    backColorGreen = 255;
                    colorRed = 0;
                    backColorRed = 0;
                }
                html += '<td ' +
                    'style="background-color: rgb(' + backColorRed + ',' + backColorGreen + ',0);' +
                    'color: rgb(' + colorRed + ',' + colorGreen + ',0)">' +
                    (height?height:'') + '</td>';
            }
            html += '</tr>';
        }
        previousPositions[state.position.x + ',' + state.position.y] = true;

        containerElement.innerHTML = '<table class="InfectionGameHtmlTableRender">' + html + '</table>';
    }
}
