var errors = require('./errors');

/**
 * performs the simplified cache reference follow.  This
 * differs from get as there is just following and reporting,
 * not much else.
 *
 * @param {Object} cacheRoot
 * @param {Array} ref
 */
function followReference(cacheRoot, ref, maxRefFollow) {
    if (typeof maxRefFollow === "undefined") {
        maxRefFollow = 5;
    }
    var branch = cacheRoot;
    var node = branch;
    var refPath = ref;
    var depth = -1;
    var referenceCount = 0;

    while (++depth < refPath.length) {
        var key = refPath[depth];
        node = branch[key];

        if (
            node === null ||
            typeof node !== "object" ||
            (node.$type && node.$type !== "ref")
        ) {
            break;
        }

        if (node.$type === "ref") {
            // Show stopper exception.  This route is malformed.
            if (depth + 1 < refPath.length) {
                return { error: new Error(errors.innerReferences) };
            }
            if (referenceCount >= maxRefFollow) {
                return { error: new Error(errors.circularReference) };
            }

            refPath = node.value;
            depth = -1;
            branch = cacheRoot;
            referenceCount++;
        } else {
            branch = node;
        }
    }
    return { node: node, refPath: refPath };
}

module.exports = followReference;
