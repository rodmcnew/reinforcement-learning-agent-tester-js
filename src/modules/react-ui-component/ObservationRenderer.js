// import * as viewportConversions from './../environment/viewportConversions'
import React, { Component, memo } from 'react';
import PropTypes from 'prop-types';
import { config } from '../environment';
import PixelCanvas from './PixelCanvas';

// // const TD = memo(({ tileColor }) => <td style={{ backgroundColor: tileColor }} />);
// // //@TODO move to own files?
// // const Cell = (tileColor, tileIndex) => <TD key={tileIndex} tileColor={tileColor} />;
// const Cell = (tileColor, tileIndex) => <td key={tileIndex} style={{ backgroundColor: tileColor }} />;
// // const CellMemo = memo(Cell);
// const Row = (row, rowIndex) => <tr key={rowIndex}>{row.map(Cell)}</tr>;
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
                nextProps.globalObservation.position[0] * nextProps.globalObservation.tileTypes.length
                + nextProps.globalObservation.position[1];
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
            // this.props.agentObservation.position,
            config.viewPortPosition
        );
        const globalTileColors = calculateGlobalTileColors(
            this.props.globalObservation.tileTypes,
            this.props.globalObservation.position,
            this.state.previousPositions
        );


        return <div className="InfectionGameHtmlTableRender">
            <div>
                <div>Agent View</div>
                <PixelCanvas pixels={agentTileColors} />
                {/* <table className="renderer-table-canvas-agent">
                    <tbody>
                        {agentTileColors.map((row, rowIndex) =>
                            <tr key={rowIndex}>
                                {row.map((tileColor, tileIndex) =>
                                    <td key={tileIndex} style={{ backgroundColor: tileColor }} />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table> */}
            </div>
            <div>
                <div>Environment View</div>
                <PixelCanvas pixels={globalTileColors} />
                {/* <table className="renderer-table-canvas-global">
                    <tbody>
                        {globalTileColors.map((row, rowIndex) =>
                            <tr key={rowIndex}>
                                {row.map((tileColor, tileIndex) =>
                                    <td key={tileIndex} style={{ backgroundColor: tileColor }} />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table> */}
            </div>
        </div>;
    };
}

ObservationRenderer.propTypes = {
    agentObservation: PropTypes.object.isRequired,
    globalObservation: PropTypes.object.isRequired,
    gameNumber: PropTypes.number.isRequired
};

function calculateGlobalTileColors(tileTypes, position, previousPositions) {
    const tileColors = [];
    const xLength = tileTypes.length;
    const yLength = tileTypes[0].length;
    for (let x = 0; x < xLength; x++) {
        for (let y = 0; y < yLength; y++) {
            let scalarPosition = x * xLength + y;
            let inPreviousPosition = previousPositions[scalarPosition];
            let color = { r: 50, g: 50, b: 50 };
            if (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) {
                color = { r: 255, g: 255, b: 0 };
            } else if (x === position[0] && y === position[1]) {
                color = { r: 0, g: 255, b: 0 };
            } else if (inPreviousPosition && tileTypes[x][y] !== 0) {
                color = { r: 255, g: 255, b: 128 }
            } else if (inPreviousPosition) {
                color = { r: 0, g: 128, b: 0 }
            } else if (tileTypes[x][y] !== 0) {
                color = { r: 230, g: 0, b: 0 };
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
            let color = { r: 50, g: 50, b: 50 };
            if (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) {
                color = { r: 255, g: 255, b: 0 };
            } else if (x === position[0] && y === position[1]) {
                color = { r: 0, g: 255, b: 0 };
            } else if (tileTypes[x][y] !== 0) {
                color = { r: 230, g: 0, b: 0 };
            }
            if (!tileColors[y]) {
                tileColors[y] = [];
            }
            tileColors[y][x] = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        }
    }
    return tileColors;
}
