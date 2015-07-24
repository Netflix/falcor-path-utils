var toPaths = require('./toPaths');
var toTree = require('./toTree');
module.exports = {
    iterateKeySet: require('./iterateKeySet'),
    toTree: toTree,
    toTreeWithUnion: require('./toTreeWithUnion'),
    toPaths: toPaths,
    collapse: function(paths) {
        return toPaths(toTree(paths));
    }
};
