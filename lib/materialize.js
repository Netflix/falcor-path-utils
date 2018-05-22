'use strict';
var iterateKeySet = require('./iterateKeySet');

/**
 * Construct a jsonGraph from a pathSet and a value.
 *
 * @param {PathSet} pathSet - pathSet of paths at which to materialize value.
 * @param {JsonGraphNode} value - value to materialize at pathSet paths.
 * @returns {JsonGraphNode} - JsonGraph of value at pathSet paths.
 * @public
 */

module.exports = function materialize(pathSet, value) {
  return pathSet.reduceRight(function materializeInner(acc, keySet) {
    var branch = {};
    if (typeof keySet !== 'object' || keySet === null) {
      branch[keySet] = acc;
      return branch;
    }
    var iteratorNote = {};
    var key = iterateKeySet(keySet, iteratorNote);
    while (!iteratorNote.done) {
      branch[key] = acc;
      key = iterateKeySet(keySet, iteratorNote);
    }
    return branch;
  }, value);
};
