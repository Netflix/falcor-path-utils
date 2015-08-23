var stripFromPathsWithTree = require('./../lib/stripFromPathsWithTree');
var expect = require('chai').expect;

describe('stripFromPathsWithTree', function() {
    it('should strip the single path from tree.', function() {
        var paths = [['one', 'two']];
        var tree = {one: {two: null}};
        var out = stripFromPathsWithTree(paths, tree);
        expect(out).to.deep.equals([]);
    });

    it('should not strip the single path from tree.', function() {
        var paths = [['one', 'two']];
        var tree = {one: {too: null}};
        var out = stripFromPathsWithTree(paths, tree);
        expect(out).to.deep.equals([['one', 'two']]);
    });

    it('should strip out one of the two paths, has complex paths.', function() {
        var paths = [
            ['one', {from: 0, to: 1}, 'two'],
            ['one', {from: 0, to: 2}, 'two']
        ];
        var tree = {
            one: {
                0: {
                    two: null
                },
                1: {
                    two: null
                }
            }
        };
        var out = stripFromPathsWithTree(paths, tree);
        expect(out).to.deep.equals([['one', {from: 0, to: 2}, 'two']]);
    });
});
