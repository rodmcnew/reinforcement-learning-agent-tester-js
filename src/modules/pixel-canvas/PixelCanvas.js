// import React, { useRef, memo } from 'react';
// import createDrawPixel from './createDrawPixel';

// const PixelCanvas = ({ pixels }) => {
//     const canvasRef = useRef();
//     if (canvasRef.current) {
//         const canvas = canvasRef.current;
//         const drawPixel = createDrawPixel(canvasRef.current, pixels[0].length, pixels.length)
//         let row;
//         for (let y = 0, yLen = pixels.length; y < yLen; y++) {
//             row = pixels[y];
//             for (let x = 0, xLen = pixels.length; x < xLen; x++) {
//                 drawPixel(x, y, row[x]);
//             }
//         }
//     }

//     return <canvas ref={canvasRef} height="200" width="200" />
// };

// export default memo(PixelCanvas);