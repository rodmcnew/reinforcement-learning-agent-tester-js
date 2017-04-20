import {State} from '../environment'
import './HtmlTable.css'

export default class HtmlTable {
    constructor(containerElement, environmentConfig) {
        this.clear();//Call clear to init internal state properties

        let html = '';
        for (let yi = 0; yi < environmentConfig.size; yi++) {
            html += '<tr>';
            for (let xi = 0; xi < environmentConfig.size; xi++) {
                html += '<td id="' + xi + '-' + yi + '"></td>';
            }
            html += '</tr>';
        }

        containerElement.innerHTML = '<table class="InfectionGameHtmlTableRender">' + html + '</table>';
    }

    /**
     * Clears the state of the renderer causing it to forget any stored state.
     */
    clear() {
        this._previousPositions = [];
    }

    /**
     * Render the current state of the environment in HTML
     *
     * @param {State} state
     */
    render(state) {
        let html = '';
        for (let yi = 0; yi < state.size; yi++) {
            html += '<tr>';
            for (let xi = 0; xi < state.size; xi++) {
                let backColorRed = state.costs[xi][yi] === 0 ? 0 : 230;
                let backColorGreen = 0;
                if (this._previousPositions[xi + ',' + yi]) {
                    backColorGreen = 128;
                }
                if (xi == state.position.x && yi == state.position.y) {
                    backColorGreen = 255;
                    backColorRed = 0;
                }
                document.getElementById(xi + '-' + yi).style
                    .backgroundColor = 'rgb(' + backColorRed + ',' + backColorGreen + ',0)';
            }
            html += '</tr>';
        }
        this._previousPositions[state.position.x + ',' + state.position.y] = true;
    };
}
