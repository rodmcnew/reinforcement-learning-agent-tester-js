export function getIndexOfMaxValue(array) {
    var maxValue = array[0];
    var maxIndex = 0;
    for (var i = 1, length = array.length; i < length; i++) {
        var v = array[i];
        if (v > maxValue) {
            maxIndex = i;
            maxValue = v;
        }
    }
    return maxIndex;
}
