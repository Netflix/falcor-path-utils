var iterateKeySet = require('./iterateKeySet');

/**
 * Compares the paths passed in with the tree.  Any of the paths that are in
 * the tree will be stripped from the paths.
 *
 * **Does not mutate** the incoming paths object.
 * **Proper subset** only matching.
 *
 * @param {Array} paths - A list of paths (complex or simple) to strip the
 * intersection
 * @param {Object} tree -
 * @public
 */
module.exports = function stripFromPathsWithTree(paths, tree) {
    var out = [];
    var outLength = -1;

    for (var i = 0, len = paths.length; i < len; ++i) {
        // If this intersects, then strip.
        if (!_stripIntersection(tree, paths[i], 0)) {
            out[++outLength] = paths[i];
        }
    }
    return out;
};

/**
 * Tests to see if the intersection should be stripped from the
 * total paths.  The only way this happens currently is if the entirety
 * of the path is contained in the tree.
 * @private
 */
function _stripIntersection(tree, path, depth) {
    var current = tree;
    var intersects = true;

    // Continue iteratively going down a path until a complex key is
    // encountered, then recurse.
    for (;intersects && depth < path.length; ++depth) {
        var key = path[depth];
        var keyType = typeof key;

        // We have to iterate key set
        if (key && keyType === 'object') {
            var note = {};
            var innerKey = iterateKeySet(key, note);
            var nextDepth = depth + 1;

            // Loop through the innerKeys setting the intersects flag
            // to each result.  Break out on false.
            do {
                var next = current[innerKey];
                intersects = next !== undefined;

                if (intersects) {
                    intersects = _stripIntersection(next, path, nextDepth);
                }
                innerKey = iterateKeySet(key, note);
            } while (intersects && !note.done);

            // Since we recursed, we shall not pass any further!
            break;
        }

        // Its a simple key, just move forward with the testing.
        current = current[key];
        intersects = current !== undefined;
    }

    return intersects;
}
