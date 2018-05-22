// @flow
/*::
import type { Key, KeySet, PathSet, Path, JsonGraph, JsonGraphNode, JsonMap } from "falcor-json-graph";
export type PathTree = { [key: string]: PathTree | null | void };
export type LengthTree = { [key: number]: PathTree | void };
export type IteratorNote = { done?: boolean };
type FalcorPathUtils = {
    iterateKeySet(keySet: KeySet, note: IteratorNote): Key;
    toTree(paths: PathSet[]): PathTree;
    pathsComplementFromTree(paths: PathSet[], tree: PathTree): PathSet[];
    pathsComplementFromLengthTree(paths: PathSet[], tree: LengthTree): PathSet[];
    toJsonKey(obj: JsonMap): string;
    isJsonKey(key: Key): boolean;
    maybeJsonKey(key: Key): JsonMap | void;
    hasIntersection(tree: PathTree, path: PathSet, depth: number): boolean;
    toPaths(lengths: LengthTree): PathSet[];
    isIntegerKey(key: Key): boolean;
    maybeIntegerKey(key: Key): number | void;
    collapse(paths: PathSet[]): PathSet[];
    followReference(
        cacheRoot: JsonGraph,
        ref: Path,
        maxRefFollow?: number
    ): { error: Error } | { error?: empty, node: ?JsonGraphNode, refPath: Path };
    optimizePathSets(
        cache: JsonGraph,
        paths: PathSet[],
        maxRefFollow?: number
    ): { error: Error } | { error?: empty, paths: PathSet[] };
    pathCount(path: PathSet): number;
    escape(key: string): string;
    unescape(key: string): string;
    materialize(pathSet: PathSet, value: JsonGraphNode): JsonGraphNode;
};
*/
module.exports = ({
    iterateKeySet: require('./iterateKeySet'),
    toTree: require('./toTree'),
    pathsComplementFromTree: require('./pathsComplementFromTree'),
    pathsComplementFromLengthTree: require('./pathsComplementFromLengthTree'),
    toJsonKey: require('./jsonKey').toJsonKey,
    isJsonKey: require('./jsonKey').isJsonKey,
    maybeJsonKey: require('./jsonKey').maybeJsonKey,
    hasIntersection: require('./hasIntersection'),
    toPaths: require('./toPaths'),
    isIntegerKey: require('./integerKey').isIntegerKey,
    maybeIntegerKey: require('./integerKey').maybeIntegerKey,
    collapse: require('./collapse'),
    followReference: require('./followReference'),
    optimizePathSets: require('./optimizePathSets'),
    pathCount: require('./pathCount'),
    escape: require('./escape'),
    unescape: require('./unescape'),
    materialize: require('./materialize')
}/*: FalcorPathUtils*/);
