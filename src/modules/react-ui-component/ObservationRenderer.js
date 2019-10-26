// import * as viewportConversions from './../environment/viewportConversions'
import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class ObservationRenderer extends Component {
    constructor() {
        super();
        this.state = {
            gameNumber: 0,
            previousPositions: [] //Stores the "trail" of where we have been on the environment view
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameNumber !== this.state.gameNumber) {
            //We are in a new game so clear previously saved "previous positions trail"
            this.setState({
                gameNumber: nextProps.gameNumber,
                previousPositions: []
            });
        } else {
            //We are in the same game as before so add to the current "previous positions trail"
            const previousPositions = this.state.previousPositions.slice();//Make copy to preserve immutability
            const scalarPosition =
                nextProps.godObservation.position[0] * nextProps.godObservation.tileTypes.length
                + nextProps.godObservation.position[1];
            previousPositions[scalarPosition] = true;
            this.setState({
                previousPositions: previousPositions
            });
        }
    }

    render() {
        const agentTileColors = calculateAgentTileColors(
            // viewportConversions.convert9x9to5x3(this.props.agentObservation.tileTypes),
            this.props.agentObservation.tileTypes,
            // [2, 0]
            this.props.agentObservation.position
        );
        const godTileColors = calculateGodTileColors(
            this.props.godObservation.tileTypes,
            this.props.godObservation.position,
            this.state.previousPositions
        );

        return <div className="InfectionGameHtmlTableRender">
            <div>
                <span>Agent View</span>
                <table className="renderer-table-canvas-agent">
                    <tbody>
                    {agentTileColors.map((row, rowIndex) =>
                        <tr key={rowIndex}>
                            {row.map((tileColor, tileIndex) =>
                                <td key={tileIndex} style={{backgroundColor: tileColor}}/>
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
                    {godTileColors.map((row, rowIndex) =>
                        <tr key={rowIndex}>
                            {row.map((tileColor, tileIndex) =>
                                <td key={tileIndex} style={{backgroundColor: tileColor}}/>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>;
    };
}

ObservationRenderer.propTypes = {
    agentObservation: PropTypes.object.isRequired,
    godObservation: PropTypes.object.isRequired,
    gameNumber: PropTypes.number.isRequired
};

function calculateGodTileColors(tileTypes, position, previousPositions) {
    const tileColors = [];
    const xLength = tileTypes.length;
    const yLength = tileTypes[0].length;
    for (let x = 0; x < xLength; x++) {
        for (let y = 0; y < yLength; y++) {
            let scalarPosition = x * xLength + y;
            let inPreviousPosition = previousPositions[scalarPosition];
            let color = {r: 50, g: 50, b: 50};
            if (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) {
                color = {r: 255, g: 255, b: 0};
            } else if (x === position[0] && y === position[1]) {
                color = {r: 0, g: 255, b: 0};
            } else if (inPreviousPosition && tileTypes[x][y] !== 0) {
                color = {r: 255, g: 255, b: 128}
            } else if (inPreviousPosition) {
                color = {r: 0, g: 128, b: 0}
            } else if (tileTypes[x][y] !== 0) {
                color = {r: 230, g: 0, b: 0};
            }
            if (!tileColors[y]) {
                tileColors[y] = [];
            }
            tileColors[y][x] = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        }
    }

    return tileColors;
}

function calculateAgentTileColors(tileTypes, position) {
    const tileColors = [];
    const xLength = tileTypes.length;
    const yLength = tileTypes[0].length;
    for (let x = 0; x < xLength; x++) {
        for (let y = 0; y < yLength; y++) {
            let color = {r: 50, g: 50, b: 50};
            if (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) {
                color = {r: 255, g: 255, b: 0};
            } else if (x === position[0] && y === position[1]) {
                color = {r: 0, g: 255, b: 0};
            } else if (tileTypes[x][y] !== 0) {
                color = {r: 230, g: 0, b: 0};
            }
            if (!tileColors[y]) {
                tileColors[y] = [];
            }
            tileColors[y][x] = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        }
    }
    return tileColors;
}
