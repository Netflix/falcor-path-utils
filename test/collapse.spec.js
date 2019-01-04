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
});
