var optimizePathSets = require('./../lib/optimizePathSets');
var falcorJsonGraph = require('falcor-json-graph');
var $ref = falcorJsonGraph.ref;
var $atom = falcorJsonGraph.atom;
var expect = require('chai').expect;
var errors = require('./../lib/errors');

/**
 * normally i don't test internals but i think the merges
 * warrent internal testing.  The reason being is that the
 * merges are core to the product.  If i don't, i will have to
 * figure out where bugs are without much clarity into where they
 * are.
 */
describe('optimizePathSets', function() {
    it('should optimize simple path.', function() {
        var cache = getCache();
        var paths = [['videosList', 3, 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [['videos', 956, 'summary']];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should optimize a complex path.', function() {
        var cache = getCache();
        var paths = [['videosList', [0, 3], 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [
            ['videosList', 0, 'summary'],
            ['videos', 956, 'summary']
        ];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should remove found paths', function() {
        var cache = getCache();
        var paths = [['videosList', [0, 3, 5], 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [
            ['videosList', 0, 'summary'],
            ['videos', 956, 'summary']
        ];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should follow double references.', function() {
        var cache = getCache();
        var paths = [['videosList', 'double', 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [
            ['videos', 956, 'summary']
        ];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should short circuit on ref.', function() {
        var cache = getCache();
        var paths = [['videosList', 'short', 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should short circuit on primitive string values', function() {
        var cache = getCache();
        var paths = [['videos', '6', 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should short circuit on primitive number values', function() {
        var cache = getCache();
        var paths = [['videos', '7', 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should short circuit on primitive boolean values', function() {
        var cache = getCache();
        var paths = [['videos', '8', 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should short circuit on primitive null value', function() {
        var cache = getCache();
        var paths = [['videos', '9', 'summary']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should not treat falsey string as missing', function() {
        var cache = getCache();
        var paths = [['falsey', 'string']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should not treat falsey number as missing', function() {
        var cache = getCache();
        var paths = [['falsey', 'number']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should not treat falsey boolean as missing', function() {
        var cache = getCache();
        var paths = [['falsey', 'boolean']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should not treat falsey null as missing', function() {
        var cache = getCache();
        var paths = [['falsey', 'null']];

        var out = optimizePathSets(cache, paths);
        var expected = [];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should preserve null in middle of path.', function() {
        var cache = getCache();
        var paths = [['videos', null, 'b']];

        var out = optimizePathSets(cache, paths);
        var expected = [['videos', null, 'b']];
        expect(out.paths).to.deep.equal(expected);
    });

    it('should return an error.', function() {
        var cache = getCache();
        var paths = [['videosList', 'inner', 'summary']];

        var out = optimizePathSets(cache, paths);
        expect(out.error.message).to.equals(errors.innerReferences);
    });

});

function getCache() {
    return {
        videosList: {
            3: $ref(['videos', 956]),
            5: $ref(['videos', 5]),
            double: $ref(['videosList', 3]),
            short: $ref(['videos', 5, 'moreKeys']),
            inner: $ref(['videosList', 3, 'inner'])
        },
        videos: {
            5: $atom('title'),

            // Short circuit on primitives
            6: 'a',
            7: 1,
            8: true,
            9: null,
            'null': {
                x: 1
            }
        },
        falsey: {
            string: '',
            number: 0,
            boolean: false,
            'null': null
        }
    };
}

