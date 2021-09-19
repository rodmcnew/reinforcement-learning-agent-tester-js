import React, { useRef, memo } from 'react';
import { config } from '../environment';
import createDrawPixel from '../pixel-canvas/createDrawPixel';

const AgentObservation = ({ agentObservation }) => {
    const canvasRef = useRef();
    const position = config.viewPortPosition;

    if (canvasRef.current && agentObservation) {
        const tileTypes = agentObservation.tileTypes;
        const xLength = tileTypes.length;
        const yLength = tileTypes[0].length;
        const drawPixel = createDrawPixel(canvasRef.current, xLength, yLength)

        for (let x = 0; x < xLength; x++) {
            for (let y = 0; y < yLength; y++) {
                let color;
                if (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) {
                    color = 'rgb(255,255,0)';
                } else if (x === position[0] && y === position[1]) {
                    color = 'rgb(0,255,0)';
                } else if (tileTypes[x][y] !== 0) {
                    color = 'rgb(230,0,0)';
                } else {
                    color = 'rgb(50,50,50)';
                }
                drawPixel(x, y, color);
            }
        }
    }

    return <canvas ref={canvasRef} height="200" width="200" />
};

export default memo(AgentObservation);