import React, { memo, useLayoutEffect, useRef } from 'react';

const EnvironmentView = ({ globalObservation, gameNumber }) => {
    const canvasRef = useRef();
    const canvasCtxRef = useRef();

    /**
     * This uses a ref rather than useState to prevent double rendering.
     */
    const previousPositionInfoRef = useRef();

    useLayoutEffect(() => {
        previousPositionInfoRef.current = { lastGameNumber: null, previousPositions: new Set() };
    }, []);

    useLayoutEffect(() => {
        if (canvasRef.current && !canvasCtxRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext("2d");
        }
    }, [canvasRef.current]);

    const drawEnvironmentView = () => {
        // console.log(globalObservation.position);
        if (gameNumber !== previousPositionInfoRef.current.lastGameNumber) {
            // If we are starting a new game, clear the position trail
            previousPositionInfoRef.current.previousPositions.clear();
            previousPositionInfoRef.current.lastGameNumber = gameNumber;
        } else {
            // If we are not starting a new game, add the current position to the position trail
            const scalarPosition = globalObservation.position[0] * globalObservation.tileTypes.length
                + globalObservation.position[1];
            previousPositionInfoRef.current.previousPositions.add(scalarPosition);
        }

        if (canvasCtxRef.current && globalObservation) {
            const tileTypes = globalObservation.tileTypes;
            const xLength = tileTypes.length;
            const yLength = tileTypes[0].length;
            const ctx = canvasCtxRef.current;
            const pixelHeight = canvasRef.current.height / xLength;
            const pixelWidth = canvasRef.current.width / yLength;
            const position = globalObservation.position;
            const previousPositions = previousPositionInfoRef.current.previousPositions;
            let fillStyle;
            let lastFillStyle;
            // console.time('loop');
            for (let x = 0; x < xLength; x++) {
                for (let y = 0; y < yLength; y++) {
                    fillStyle = (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) ? 'rgb(255,255,0)'
                        : (x === position[0] && y === position[1]) ? 'rgb(0,255,0)'
                            : (previousPositions.has(x * xLength + y)) ? (tileTypes[x][y] !== 0 ? 'rgb(255,255,128)' : 'rgb(0,128,0)')
                                : (tileTypes[x][y] !== 0) ? 'rgb(230,0,0)'
                                    : 'rgb(50,50,50)';
                    /**
                     * Avoiding "crx.fillStyle = " unless needed saves 0.5 to 1 ms on chrome i9 mac at 4x slowdown
                     */
                    if (fillStyle !== lastFillStyle) {
                        ctx.fillStyle = fillStyle;
                        lastFillStyle = fillStyle;
                    }
                    ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
                }
            }
            // console.timeEnd('loop');
        }
    }

    useLayoutEffect(drawEnvironmentView, [canvasCtxRef.current, gameNumber, previousPositionInfoRef, globalObservation]);

    return <canvas ref={canvasRef} height="200" width="200" />
};

export default memo(EnvironmentView);