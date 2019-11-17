var expect = require('chai').expect;
var pathUtils = require('..');
var collapse = pathUtils.collapse;

describe('collapse', function() {
    it('should collapse paths', function() {
        var paths = [
            ['videos', 0],
            ['videos', 1],
            ['videos', { from: 2, to: 1000 }],
            ['videosById', 1, 'title'],
            ['videosById', 1, 'summary']
        ];

        var result = collapse(paths);

        expect(result).to.eql([
            ['videos', { from: 0, to: 1000 }],
            ['videosById', 1, ['title', 'summary']],
        ]);
    });

    it('should collapse a path with reserved keyword.', function() {
        var paths = [['foo', 'hasOwnProperty'], ['foo', 'constructor']];

        var result = collapse(paths);
        expect(result).to.eql([
            ['foo', ['hasOwnProperty', 'constructor']]
        ]);
    });

    it('should collapse paths with mixed adjacents', function() {
        var paths = [
            ['videosById', 1, 'title'],
            ['videos', 0],
            ['videosById', 1, 'artwork'],
            ['videos', 1],
            ['videosById', 1, 'summary']
        ];

        var result = collapse(paths);

        expect(result).to.eql([
            ['videos', { from: 0, to: 1 }],
            ['videosById', 1, ['title', 'artwork', 'summary']],
        ]);
    });

    it('should collapse paths with mixed ranges', function() {
        var paths = [
            ['videos', [5, 1, 3], 'summary'],
            ['videos', [2, 4, 6], 'summary']
        ];

        var result = collapse(paths);

        expect(result).to.eql([
            ['videos', { from: 1, to: 6}, 'summary']
        ]);
    });

    it('should parse strings to integer by default', function() {
            var result = collapse([['videosById', '1234', 'title']]);
            expect(result).to.deep.equals([['videosById', 1234, 'title']]);
    });

    it('should not parse strings to integer with option', function() {
            var result = collapse([['videosById', '1234', 'title']], {
                    parseInteger: false
            });
            expect(result).to.deep.equals(
                    [['videosById', '1234', 'title']]
            );
    });
});
