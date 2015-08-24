var pathsComplementFromTree = require('./../lib').pathsComplementFromTree;
var pathsComplementFromLengthTree = require('./../lib').pathsComplementFromLengthTree;
var expect = require('chai').expect;

describe('pathsComplementFromTree and LengthTree', function() {
    it('should strip the single path from tree.', function() {
        var paths = [['one', 'two']];
        var tree = {one: {two: null}};
        var out = pathsComplementFromTree(paths, tree);
        expect(out).to.deep.equals([]);
    });

    it('should not strip the single path from tree.', function() {
        var paths = [['one', 'two']];
        var tree = {one: {too: null}};
        var out = pathsComplementFromTree(paths, tree);
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
        var out = pathsComplementFromTree(paths, tree);
        expect(out).to.deep.equals([['one', {from: 0, to: 2}, 'two']]);
    });

    it('should strip the single path from length tree.', function() {
        var paths = [['one', 'two']];
        var tree = {2: {one: {two: null}}};
        var out = pathsComplementFromLengthTree(paths, tree);
        expect(out).to.deep.equals([]);
    });

    it('should not strip the single path from length tree.', function() {
        var paths = [['one', 'two']];
        var tree = {2: {one: {too: null}}};
        var out = pathsComplementFromLengthTree(paths, tree);
        expect(out).to.deep.equals([['one', 'two']]);
    });

    it('should strip out one of the two paths, has complex paths from length tree.', function() {
        var paths = [
            ['one', {from: 0, to: 1}, 'two'],
            ['one', {from: 0, to: 2}, 'two']
        ];
        var tree = {
            3: {
                one: {
                    0: {
                        two: null
                    },
                    1: {
                        two: null
                    }
                }
            }
        };
        var out = pathsComplementFromLengthTree(paths, tree);
        expect(out).to.deep.equals([['one', {from: 0, to: 2}, 'two']]);
    });
});
