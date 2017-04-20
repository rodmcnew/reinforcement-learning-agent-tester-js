export default (actionCountToLookAhead)=> {
    // let antiActions = {
    //     'a': 'd',
    //     's': 'w',
    //     'd': 'a',
    //     'w': 's'
    // };

    let paths = [
        {path: ['a']},
        {path: ['s']},
        {path: ['d']},
        // {path: ['w']},
    ];

    function generateMorePaths() {
        let morePaths = [];
        paths.forEach(function (path) {
            if (path.path[path.path.length - 1] != 'd') { //Prevent infinite back and forth operations
                morePaths.push({path: path.path.concat(['a'])});
            }
            if (path.path[path.path.length - 1] != 'w') { //Prevent infinite back and forth operations
                morePaths.push({path: path.path.concat(['s'])});
            }
            // if (path.path[path.path.length - 1] != 's') { //Prevent infinite back and forth operations
            //     morePaths.push({path: path.path.concat(['w'])});
            // }
            if (path.path[path.path.length - 1] != 'a') { //Prevent infinite back and forth operations
                morePaths.push({path: path.path.concat(['d'])});
            }
        });
        paths = paths.concat(morePaths);
    }

    for (var i = 1; i < actionCountToLookAhead; i++) {
        generateMorePaths();
    }

    paths = paths.filter((path)=>path.path.length == actionCountToLookAhead);

    return paths;
}