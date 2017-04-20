import './HtmlTableRenderer.css'

export default class HtmlTableRenderer {
    constructor(containerElement, environmentConfig) {
        this.clear();//Call clear to init internal observation properties

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
     * Clears the observation of the renderer causing it to forget any stored observation.
     */
    clear() {
        this._previousPositions = [];
    }

    /**
     * Render the current observation of the environment in HTML
     *
     * @param {Observation} observation
     */
    render(observation) {
        for (let yi = 0; yi < observation.size; yi++) {
            for (let xi = 0; xi < observation.size; xi++) {
                let backColorRed = observation.costs[xi][yi] === 0 ? 0 : 230;
                let backColorGreen = 0;
                if (this._previousPositions[xi + ',' + yi]) {
                    backColorGreen = 128;
                }
                if (xi == observation.position.x && yi == observation.position.y) {
                    backColorGreen = 255;
                    backColorRed = 0;
                }
                document.getElementById(xi + '-' + yi).style
                    .backgroundColor = 'rgb(' + backColorRed + ',' + backColorGreen + ',0)';
            }
        }
        this._previousPositions[observation.position.x + ',' + observation.position.y] = true;
    };
}
