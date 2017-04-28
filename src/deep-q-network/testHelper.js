export function assertEquals(actual, expected, moreInfo) {
    if (actual !== expected) {
        var message = 'expected:' + actual + '!==actual:' + expected;
        if (moreInfo) {
            message += ', ' + moreInfo;
        }
        throw new Error(message);
    }
}
