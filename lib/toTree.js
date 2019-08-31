var iterateKeySet = require('./../lib/iterateKeySet');

/**
 * @param {Array} paths -
 * @returns {Object} -
 */
module.exports = function toTree(paths) {
    return paths.reduce(function(acc, path) {
        innerToTree(acc, path, 0);
        return acc;
    }, {});
};

function innerToTree(seed, path, depth) {
    var keySet = path[depth];
    var iteratorNote = {};
    var key;
    var nextDepth = depth + 1;

    key = iterateKeySet(keySet, iteratorNote);

    while (!iteratorNote.done) {
        var next = Object.prototype.hasOwnProperty.call(seed, key) && seed[key];
        if (!next) {
            if (nextDepth === path.length) {
                seed[key] = null;
            } else if (key !== undefined) {
                next = seed[key] = {};
            }
        }

        if (nextDepth < path.length) {
            innerToTree(next, path, nextDepth);
        }

        key = iterateKeySet(keySet, iteratorNote);
    }
}

