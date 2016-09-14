var expect = require('chai').expect;
var toPaths = require('../lib/toPaths');
var toTree = require('../lib/toTree');

var isSafeNumber = toPaths._isSafeNumber;

describe('toPaths', function() {
    it('toPaths a pathmap that has overlapping branch and leaf nodes', function() {

        var pathMaps = [null, {
            lolomo: 1
        }, {
            lolomo: {
                summary: 1,
                13: 1,
                14: 1
            }
        }, {
            lolomo: {
                15: {
                    rating: 1,
                    summary: 1
                },
                13: {
                    summary: 1
                },
                16: {
                    rating: 1,
                    summary: 1
                },
                14: {
                    summary: 1
                },
                17: {
                    rating: 1,
                    summary: 1
                }
            }
        }];

        var paths = toPaths(pathMaps).sort(function(a, b) {
            return a.length - b.length;
        });

        var first = paths[0];
        var second = paths[1];
        var third = paths[2];
        var fourth = paths[3];

        expect(first[0] === 'lolomo').to.equal(true);

        expect((
            second[0] === 'lolomo')   && (
            second[1][0] === 13) && (
            second[1][1] === 14) && (
            second[1][2] === 'summary')
        ).to.equal(true);

        expect((third[0] === 'lolomo') && (
            third[1].from === 13)   && (
            third[1].to === 14)     && (
            third[2] === 'summary')
        ).to.equal(true);

        expect((fourth[0] === 'lolomo') && (
            fourth[1].from === 15)   && (
            fourth[1].to === 17)     && (
            fourth[2][0] === 'rating')  && (
            fourth[2][1] === 'summary')
        ).to.equal(true);
    });

    it('toPaths should not coerce numbers to strings outside the safe range', function() {
        /*
         * For reference:
         * https://github.com/Netflix/falcor-router/issues/176
         * https://github.com/Netflix/falcor-router/issues/68
         * https://github.com/Netflix/falcor-path-utils/pull/6
         */

        var pathMaps = [null, {
            lolomo: 1
        }, {
            lolomo: {
                '0': 1,
                '1': 1,
                '234': 1,
                '345678': 1,
                '4253674286': 1,
                '9007199254740991': 1,
                '9007199254740992': 1,
                '918572487653498743278645': 1,
            }
        }];

        var paths = toPaths(pathMaps).sort(function(a, b) {
            return a.length - b.length;
        });

        // NOTE:
        // chai equal() is strict such that expect(4).to.equal('4')
        // will fail and vice versa.
        expect(paths[1][1][0]).to.equal(0);
        expect(paths[1][1][1]).to.equal(1);
        expect(paths[1][1][2]).to.equal(234);
        expect(paths[1][1][3]).to.equal(345678);
        expect(paths[1][1][4]).to.equal(4253674286);
        expect(paths[1][1][5]).to.equal(9007199254740991); // max safe int
        expect(paths[1][1][6]).to.equal('9007199254740992'); // max safe int + 1
        expect(paths[1][1][7]).to.equal('918572487653498743278645'); // absurdly large
    });


    it('should explode a simplePath.', function() {
        var out = ['one', 'two'];
        var input = {2: {one: {two: null}}};

        expect(toPaths(input)).to.deep.equals([out]);
    });

    it('should explode a complex.', function() {
        var input = {2: {one: {two: null, three: null}}};
        var out = ['one', ['three', 'two']];
        var output = toPaths(input);
        output[0][1].sort();

        expect(output).to.deep.equals([out]);
    });

    it('should explode a set of complex and simple paths.', function() {
        var out = [
            ['one', ['three', 'two']],
            ['one', {from: 0, to: 3}, 'summary']
        ];
        var input = {
            2: {
                one: {
                    three: null,
                    two: null
                }
            },
            3: {
                one: {
                    0: { summary: null },
                    1: { summary: null },
                    2: { summary: null },
                    3: { summary: null }
                }
            }
        };

        var output = toPaths(input);
        if (!Array.isArray(output[0][1])) {
            var tmp = output[0];
            output[0] = output[1];
            output[1] = tmp;
        }

        output[0][1].sort();

        expect(output).to.deep.equals(out);
    });

    it('should translate between toPaths and toTrees', function() {
        var expectedTree = {
            one: {
                0: { summary: null },
                1: { summary: null },
                2: { summary: null },
                3: { summary: null },
                three: null,
                two: null
            }
        };
        var treeMap = {
            2: {
                one: {
                    three: null,
                    two: null
                }
            },
            3: {
                one: {
                    0: { summary: null },
                    1: { summary: null },
                    2: { summary: null },
                    3: { summary: null }
                }
            }
        };

        expect(toTree(toPaths(treeMap))).to.deep.equals(expectedTree);
    });

    describe('isSafeNumber', function() {

        var thingsThatShouldReturnTrue = [
            0,
            1,
            -0,
            -1,
            10,
            -10,
            9007199254740991, // max safe int
            -9007199254740991, // min safe int
            '0',
            '1',
            '-1',
            '10',
            '-10',
            '9007199254740991', // max safe int
            '-9007199254740991', // min safe int
        ];
        thingsThatShouldReturnTrue.forEach(function(thing) {
            var should = 'should return true on ' + JSON.stringify(thing);
            it(should, function() {
                expect(isSafeNumber(thing)).to.equal(true);
            });
        });

        var thingsThatShouldReturnFalse = [
            [],
            {},
            null,
            true,
            false,
            undefined,
            NaN,
            Infinity,
            -Infinity,
            '9007199254740992', // max safe int + 1
            '-9007199254740992', // min safe int - 1
            9007199254740992, // max safe int + 1
            -9007199254740992, // min safe int - 1
            '648365838265483646384563538',
            '-0',
            '',
            '01',
            '0d',
            '1d',
            '_',
            ' 1',
            '- 1',
            ' ',
            '0x123',
            '0b1101',
            'deadbeef',
            0.1,
            -0.1,
            '1.0',
            '-1.0',
            '0.1',
            '-0.1',
        ];
        thingsThatShouldReturnFalse.forEach(function(thing) {
            var should = 'should return false on ' + JSON.stringify(thing);
            it(should, function() {
                expect(isSafeNumber(thing)).to.equal(false);
            });
        });
    });
});
