export function assertIsNumber(value, valueLabel) {
    if(!isFinite(value)){
        throw new Error(valueLabel + ' is not a finite number');
    }
}
