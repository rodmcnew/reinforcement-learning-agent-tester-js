export default function generateFeelerPaths(maxSidewaysMoves) {
    const permutator = (inputArr) => {
        let result = [];
        const permute = (arr, m = []) => {
            if (arr.length === 0) {
                result.push(m)
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next))
                }
            }
        }
        permute(inputArr)
        return result;
    }

    let feelerPaths = [['s', 's']];
    let leftPaths = ['s', 's'];
    let rightPaths = ['s', 's'];
    for (var i = 0; i < maxSidewaysMoves; i++) {
        leftPaths.push('a');
        rightPaths.push('d');
        feelerPaths = feelerPaths.concat(permutator(leftPaths), permutator(rightPaths));
    }

    //Remove duplicate paths
    feelerPaths = [...new Set(feelerPaths.map(path => path.join(',')))].map(path => path.split(','));

    //Remove paths that don't end with a down action
    feelerPaths = feelerPaths.filter(path => path[path.length - 1] === 's');

    feelerPaths = feelerPaths.sort((a, b) => {
        const aString = a.join();
        const bString = b.join();
        if (aString < bString) { return -1; }
        if (aString > bString) { return 1; }
        return 0;
    });

    return feelerPaths;
}