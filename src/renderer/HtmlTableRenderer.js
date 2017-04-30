import './HtmlTableRenderer.css'
import {getMatrixDimensions} from '../tensorTools'
import {config as environmentConfig} from '../environment'
import * as viewportConverstions from './viewportConversions'

function generateTableHtml(size, tableClassName) {
    var html = '';
    for (var y = 0; y < size[1]; y++) {
        html += '<tr>';
        for (var x = 0; x < size[0]; x++) {
            html += '<td class="tile-' + x + '-' + y + '"></td>';
        }
        html += '</tr>';
    }
    return '<table class="' + tableClassName + '">' + html + '</table>';
}

function getTdElements(size, tableClassName) {
    var tdElements = [];
    for (var x = 0; x < size[0]; x++) {
        tdElements[x] = [];
        for (var y = 0; y < size[1]; y++) {
            tdElements[x][y] = document.querySelector('table.' + tableClassName + ' td.tile-' + x + '-' + y);
        }
    }
    return tdElements;
}

export default class HtmlTableRenderer {
    constructor(containerElement) {
        this.clear();//Call clear to init internal observation properties

        containerElement.innerHTML = '<div class="InfectionGameHtmlTableRender">' +
            '<div>' +
            'Agent View' +
            generateTableHtml(environmentConfig.viewPortSize, 'renderer-table-canvas-agent') +
            '</div>' +
            '<div>' +
            'Environment View' +
            generateTableHtml(environmentConfig.size, 'renderer-table-canvas-god') +
            '</div>' +
            '</div>';

        this._agentTds = getTdElements(environmentConfig.viewPortSize, 'renderer-table-canvas-agent');
        this._godTds = getTdElements(environmentConfig.size, 'renderer-table-canvas-god')
    }

    /**
     * Clears the observation of the renderer causing it to forget any stored observation.
     */
    clear() {
        this._previousPositions = new Array(environmentConfig.size[0]);
        for (var i = 0; i < environmentConfig.size[0]; i++) {
            this._previousPositions[i] = new Array(environmentConfig.size[1]);
        }
    }

    /**
     * Render the current observation of the environment in HTML
     *
     * @param {AgentObservation} agentObservation
     * @param {State} godObservation
     */
    render(agentObservation, godObservation) {
        //Render the agent view
        this._renderAgentViewport(agentObservation.tileTypes, agentObservation.position);
        // this._renderAgentViewport(viewportConverstions.convert9x9to5x2(agentObservation.tileTypes), [2, 0]);
        // this._renderAgentViewport(viewportConverstions.convert9x9to3x2(agentObservation.tileTypes), [1, 0]);

        //Render the god view
        var xLength = environmentConfig.size[0];
        var yLength = environmentConfig.size[1];
        for (var x = 0; x < xLength; x++) {
            for (var y = 0; y < yLength; y++) {
                var inPreviousPosition = this._previousPositions[x][y];
                var color = {r: 50, g: 50, b: 50};
                if (x == godObservation.position[0] && y == godObservation.position[1] && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x == godObservation.position[0] && y == godObservation.position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (inPreviousPosition && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 128}
                } else if (inPreviousPosition) {
                    color = {r: 0, g: 128, b: 0}
                } else if (godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                this._godTds[x][y].style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }

        this._previousPositions[godObservation.position[0]][godObservation.position[1]] = true;
    };

    _renderAgentViewport(tileTypes, position) {
        var agentViewPortSize = [
            tileTypes.length,
            tileTypes[0].length
        ];

        var xLength = agentViewPortSize[0];
        var yLength = agentViewPortSize[1];
        for (var x = 0; x < xLength; x++) {
            for (var y = 0; y < yLength; y++) {
                var color = {r: 50, g: 50, b: 50};
                // if (visibles[x][y] === 0) {
                //     color = {r: 0, g: 0, b: 0};
                // } else
                if (x == position[0] && y == position[1] && tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x == position[0] && y == position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (tileTypes[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                this._agentTds[x][y].style
                    .backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }
    }
}
