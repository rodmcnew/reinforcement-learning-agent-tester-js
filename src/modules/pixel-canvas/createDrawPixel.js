// const createDrawPixel = (canvas, pixelsWidth, pixelsHeight) => {
//     const pixelHeight = canvas.height / pixelsHeight;
//     const pixelWidth = canvas.width / pixelsWidth;
//     const ctx = canvas.getContext("2d");
//     const drawPixel = (x, y, color) => {
//         ctx.fillStyle = color;
//         ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
//     }
//     return drawPixel;
// }
// export default createDrawPixel;