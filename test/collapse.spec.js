var expect = require('chai').expect;
var pathUtils = require('..');
var collapse = pathUtils.collapse;

describe('collapse', function() {
    it('paths', function() {

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
});
