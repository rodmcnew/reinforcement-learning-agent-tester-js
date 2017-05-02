import './HtmlTableRenderer.css'
// import {getMatrixDimensions} from '../tensorTools'
import {config as environmentConfig} from '../environment'
import * as viewportConverstions from './viewportConversions'
import React, {Component} from 'react';
import PropTypes from 'prop-types'


// function generateTableHtml(size, tableClassName) {
//     var html = '';
//     for (var y = 0; y < size[1]; y++) {
//         html += '<tr>';
//         for (var x = 0; x < size[0]; x++) {
//             html += '<td class="tile-' + x + '-' + y + '"></td>';
//         }
//         html += '</tr>';
//     }
//     return '<table class="' + tableClassName + '">' + html + '</table>';
// }
//
// function getTdElements(size, tableClassName) {
//     var tdElements = [];
//     for (var x = 0; x < size[0]; x++) {
//         tdElements[x] = [];
//         for (var y = 0; y < size[1]; y++) {
//             tdElements[x][y] = document.querySelector('table.' + tableClassName + ' td.tile-' + x + '-' + y);
//         }
//     }
//     return tdElements;
// }

export default class HtmlTableRenderer extends Component {
    // constructor(containerElement) {
    //     this.clear();//Call clear to init internal observation properties
    //
    //     containerElement.innerHTML = '<div class="InfectionGameHtmlTableRender">' +
    //         '<div>' +
    //         'Agent View' +
    //         generateTableHtml(environmentConfig.viewPortSize, 'renderer-table-canvas-agent') +
    //         '</div>' +
    //         '<div>' +
    //         'Environment View' +
    //         generateTableHtml(environmentConfig.size, 'renderer-table-canvas-god') +
    //         '</div>' +
    //         '</div>';
    //
    //     this._agentTds = getTdElements(environmentConfig.viewPortSize, 'renderer-table-canvas-agent');
    //     this._godTds = getTdElements(environmentConfig.size, 'renderer-table-canvas-god')
    // }

    constructor() {
        super();
        this._godTileColors = [];//These arrays are re-used to avoid instantiation slowness
        this._agentTileColors = [];//These arrays are re-used to avoid instantiation slowness
        this._previousPositionsGameNumber = 0;
        this.clearPreviousPositions()
    }

    /**
     * Clears the observation of the renderer causing it to forget any stored observation.
     */
    clearPreviousPositions() {
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
    render() {
        var godObservation = this.props.godObservation;
        var agentObservation = this.props.agentObservation;

        //Render the agent view
        // this._renderAgentViewport(agentObservation.tileTypes, agentObservation.position);
        this._renderAgentViewport(viewportConverstions.convert9x9to5x3(agentObservation.tileTypes), [2, 0]);
        // this._renderAgentViewport(viewportConverstions.convert9x9to3x2(agentObservation.tileTypes), [1, 0]);
        this._renderGodViewPort(godObservation);
        //Render the god view


        return <div className="InfectionGameHtmlTableRender">
            <div>
                <span>Agent View</span>
                <table className="renderer-table-canvas-agent">
                    <tbody>
                    {this._agentTileColors.map((row, rowIndex) =>
                        <tr key={rowIndex}>
                            {row.map((tile, tileIndex) =>
                                <td key={tileIndex} style={{backgroundColor: tile}}/>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div>
                <span>Environment View</span>
                <table className="renderer-table-canvas-god">
                    <tbody>
                    {this._godTileColors.map((row, rowIndex) =>
                        <tr key={rowIndex}>
                            {row.map((tile, tileIndex) =>
                                <td key={tileIndex} style={{backgroundColor: tile}}/>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>;
    };

    _renderGodViewPort(godObservation) {
        var xLength = environmentConfig.size[0];
        var yLength = environmentConfig.size[1];
        for (var x = 0; x < xLength; x++) {
            for (var y = 0; y < yLength; y++) {
                var inPreviousPosition = this._previousPositions[x][y];
                var color = {r: 50, g: 50, b: 50};
                if (x === godObservation.position[0] && y === godObservation.position[1] && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x === godObservation.position[0] && y === godObservation.position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (inPreviousPosition && godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 128}
                } else if (inPreviousPosition) {
                    color = {r: 0, g: 128, b: 0}
                } else if (godObservation.tileTypes[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                if (!this._godTileColors[y]) {
                    this._godTileColors[y] = [];
                }
                this._godTileColors[y][x] = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }

        if (this._previousPositionsGameNumber !== this.props.gameNumber) {
            this.clearPreviousPositions();
            this._previousPositionsGameNumber = this.props.gameNumber;
        }
        this._previousPositions[godObservation.position[0]][godObservation.position[1]] = true;
    }


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
                // if (visibles[x][y] ===  0) {
                //     color = {r: 0, g: 0, b: 0};
                // } else
                if (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) {
                    color = {r: 255, g: 255, b: 0};
                } else if (x === position[0] && y === position[1]) {
                    color = {r: 0, g: 255, b: 0};
                } else if (tileTypes[x][y] !== 0) {
                    color = {r: 230, g: 0, b: 0};
                }
                if (!this._agentTileColors[y]) {
                    this._agentTileColors[y] = [];
                }
                this._agentTileColors[y][x] = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            }
        }
    }
}

HtmlTableRenderer.propTypes = {
    agentObservation: PropTypes.object.isRequired,
    godObservation: PropTypes.object.isRequired,
    gameNumber: PropTypes.number.isRequired
};
