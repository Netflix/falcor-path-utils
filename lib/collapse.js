var toPaths = require('./toPaths');
var toTree = require('./toTree');

module.exports = function collapse(paths) {
    var collapseMap = paths.
        reduce(function(acc, path) {
            var len = path.length;
            if (!acc[len]) {
                acc[len] = [];
            }
            acc[len].push(path);
            return acc;
        }, {});

    Object.
        keys(collapseMap).
        forEach(function(collapseKey) {
            requestMap[collapseKey] = toTree(requestMap[collapseKey]);
        });

    return toPaths(requestMap);
};
