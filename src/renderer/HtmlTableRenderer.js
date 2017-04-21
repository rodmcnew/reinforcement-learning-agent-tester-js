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
                let color = {r: 0, g: 0, b: 0};
                if (observation.visibles[xi][yi] !== 0) {
                    color.b = 200;
                }
                color.r = observation.costs[xi][yi] === 0 ? 0 : 230;
                color.g = 0;
                if (this._previousPositions[xi + ',' + yi]) {
                    color.g = 128;
                }
                if (xi == observation.position.x && yi == observation.position.y) {
                    color.g = 255;
                    color.r = 0;
                    color.b = 0;
                }
                // if (observation.visibles[xi][yi] === 0) {
                //     color.r = 255;
                //     color.g = 255;
                //     color.b = 255;
                // }
                document.getElementById(xi + '-' + yi).style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }
        this._previousPositions[observation.position.x + ',' + observation.position.y] = true;
    };
}
