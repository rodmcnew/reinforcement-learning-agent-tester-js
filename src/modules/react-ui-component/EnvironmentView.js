import React, { useRef, memo, useEffect, useState } from 'react';
import { config } from '../environment';
import createDrawPixel from '../pixel-canvas/createDrawPixel';

const EnvironmentView = ({ globalObservation, gameNumber }) => {
    const canvasRef = useRef();

    const [lastGameNumber, setLastGameNumber] = useState(null); //Stores the "trail" of where we have been on the environment view
    const [previousPositions, setPreviousPositions] = useState(new Set()); //Stores the "trail" of where we have been on the environment view

    useEffect(() => {
        if (gameNumber !== lastGameNumber) {
            // If we are starting a new game, clear the position trail
            setPreviousPositions(new Set());
            setLastGameNumber(gameNumber);
        } else {
            // If we are not starting a new game, add the current position to the position trail
            const scalarPosition = globalObservation.position[0] * globalObservation.tileTypes.length
                + globalObservation.position[1];
            if (!previousPositions.has(scalarPosition)) {
                const newPreviousPositions = new Set(previousPositions);
                newPreviousPositions.add(scalarPosition);
                setPreviousPositions(newPreviousPositions);
            }
        }
    }, [gameNumber, lastGameNumber, previousPositions, globalObservation]);

    if (canvasRef.current && globalObservation) {
        const tileTypes = globalObservation.tileTypes;
        const xLength = tileTypes.length;
        const yLength = tileTypes[0].length;
        const drawPixel = createDrawPixel(canvasRef.current, xLength, yLength)

        for (let x = 0; x < xLength; x++) {
            for (let y = 0; y < yLength; y++) {
                const position = globalObservation.position;
                let scalarPosition = x * xLength + y;
                let inPreviousPosition = previousPositions.has(scalarPosition);
                let color
                if (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) {
                    color = 'rgb(255,255,0)';
                } else if (x === position[0] && y === position[1]) {
                    color = 'rgb(0,255,0)';
                } else if (inPreviousPosition && tileTypes[x][y] !== 0) {
                    color = 'rgb(255,255,128)';
                } else if (inPreviousPosition) {
                    color = 'rgb(0,128,0)';
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

export default memo(EnvironmentView);