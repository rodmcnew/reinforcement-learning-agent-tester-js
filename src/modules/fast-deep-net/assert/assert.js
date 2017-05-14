export function assertIsNumber(value, valueLabel) {
    if(!isFinite(value)){
        throw new Error(valueLabel + ' is not finite');
    }
    if (typeof value === 'undefined') {
        throw new Error(valueLabel + ' is undefined');
    }
    if (isNaN(value)) {
        throw new Error(valueLabel + ' is NaN');
    }
}