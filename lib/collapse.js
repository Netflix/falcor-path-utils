var toPaths = require('./toPaths');
var toTree = require('./toTree');

module.exports = function collapse(paths, _opts) {
    var opts = _opts || {};

    // Enabled by default
    opts.parseInteger = opts.parseInteger !== false;

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
            collapseMap[collapseKey] = toTree(collapseMap[collapseKey]);
        });

    return toPaths(collapseMap, opts);
};
