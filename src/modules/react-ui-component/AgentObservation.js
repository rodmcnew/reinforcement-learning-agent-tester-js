import React, { memo, useLayoutEffect, useRef } from 'react';
import { config } from '../environment';

const AgentObservation = ({ agentObservation }) => {
    const canvasRef = useRef();
    const canvasCtxRef = useRef();

    const position = config.viewPortPosition;

    useLayoutEffect(() => {
        if (canvasRef.current && !canvasCtxRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext("2d");
        }
    }, [canvasRef.current]);

    const drawAgentObservation = () => {
        if (canvasCtxRef.current && agentObservation) {
            const tileTypes = agentObservation.tileTypes;
            const xLength = tileTypes.length;
            const yLength = tileTypes[0].length;
            const ctx = canvasCtxRef.current;
            const pixelHeight = canvasRef.current.height / xLength;
            const pixelWidth = canvasRef.current.width / yLength;
            for (let x = 0; x < xLength; x++) {
                for (let y = 0; y < yLength; y++) {
                    ctx.fillStyle = (x === position[0] && y === position[1] && tileTypes[x][y] !== 0) ? 'rgb(255,255,0)'
                        : (x === position[0] && y === position[1]) ? 'rgb(0,255,0)'
                            : (tileTypes[x][y] !== 0) ? 'rgb(230,0,0)'
                                : 'rgb(50,50,50)';
                    ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
                }
            }
        }
    }

    useLayoutEffect(drawAgentObservation, [canvasRef.current, agentObservation]);

    return <canvas ref={canvasRef} height="200" width="200" />
};

export default memo(AgentObservation);