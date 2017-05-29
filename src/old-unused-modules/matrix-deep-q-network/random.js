/**
 * Returns a random float who's distribution is gaussian.
 *
 * This uses the "Box-Muller transform". More info at:
 * http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
 *
 * @returns {number}
 */
export function gaussRandom() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomIntWithZeroMin(max) {
    return Math.floor(Math.random() * max);
}
