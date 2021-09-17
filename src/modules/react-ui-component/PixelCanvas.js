import React, { useRef } from 'react';
const PixelCanvas = ({ pixels }) => {
    const canvasRef = useRef();
    if (canvasRef.current) {
        const canvas = canvasRef.current;
        const pixelHeight = canvas.height / pixels.length;
        const pixelWidth = canvas.width / pixels[0].length;
        const ctx = canvas.getContext("2d");
        let row;
        for (let y = 0, yLen = pixels.length; y < yLen; y++) {
            row = pixels[y];
            for (let x = 0, xLen = pixels.length; x < xLen; x++) {
                // console.log(y, x, row[x]);
                ctx.fillStyle = row[x];
                ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
            }
        }
    }

    return <canvas ref={canvasRef} height="200" width="200" />
};

export default PixelCanvas;