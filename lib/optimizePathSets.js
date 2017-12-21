var iterateKeySet = require('./iterateKeySet');
var cloneArray = require('./support/cloneArray');
var catAndSlice = require('./support/catAndSlice');
var followReference = require('./followReference');

/**
 * The fastest possible optimize of paths.
 *
 * What it does:
 * - Any atom short-circuit / found value will be removed from the path.
 * - All paths will be exploded which means that collapse will need to be
 *   ran afterwords.
 * - Any missing path will be optimized as much as possible.
 */
module.exports = function optimizePathSets(cache, paths, maxRefFollow) {
    if (typeof maxRefFollow === "undefined") {
        maxRefFollow = 5;
    }
    var optimized = [];
    for (var i = 0, len = paths.length; i < len; ++i) {
        var error = optimizePathSet(cache, cache, paths[i], 0, optimized, [], maxRefFollow);
        if (error) {
            return { error: error };
        }
    }
    return { paths: optimized };
};


/**
 * optimizes one pathSet at a time.
 */
function optimizePathSet(cache, cacheRoot, pathSet,
                         depth, out, optimizedPath, maxRefFollow) {

    // at missing, report optimized path.
    if (cache === undefined) {
        out[out.length] = catAndSlice(optimizedPath, pathSet, depth);
        return;
    }

    // all other sentinels are short circuited.
    // Or we found a primitive (which includes null)
    if (cache === null || (cache.$type && cache.$type !== "ref") ||
            (typeof cache !== 'object')) {
        return;
    }

    // If the reference is the last item in the path then do not
    // continue to search it.
    if (cache.$type === "ref" && depth === pathSet.length) {
        return;
    }

    var keySet = pathSet[depth];
    var isKeySet = typeof keySet === 'object' && keySet !== null;
    var nextDepth = depth + 1;
    var iteratorNote = false;
    var key = keySet;
    if (isKeySet) {
        iteratorNote = {};
        key = iterateKeySet(keySet, iteratorNote);
    }
    var next, nextOptimized;
    do {
        next = cache[key];
        var optimizedPathLength = optimizedPath.length;
        optimizedPath[optimizedPathLength] = key;

        if (next && next.$type === "ref" && nextDepth < pathSet.length) {
            var refResults =
                followReference(cacheRoot, next.value, maxRefFollow);
            if (refResults.error) {
                return refResults.error;
            }
            next = refResults.node;
            // must clone to avoid the mutation from above destroying the cache.
            nextOptimized = cloneArray(refResults.refPath);
        } else {
            nextOptimized = optimizedPath;
        }

        var error = optimizePathSet(next, cacheRoot, pathSet, nextDepth,
                        out, nextOptimized, maxRefFollow);
        if (error) {
            return error;
        }
        optimizedPath.length = optimizedPathLength;

        if (iteratorNote && !iteratorNote.done) {
            key = iterateKeySet(keySet, iteratorNote);
        }
    } while (iteratorNote && !iteratorNote.done);
}
