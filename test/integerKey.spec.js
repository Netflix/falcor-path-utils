var expect = require('chai').expect;
var pathUtils = require('..');
var isIntegerKey = pathUtils.isIntegerKey;
var maybeIntegerKey = pathUtils.maybeIntegerKey;

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

describe('integerKey', function () {
    describe('isIntegerKey', function() {
        thingsThatShouldReturnTrue.forEach(function(thing) {
            var should = 'should return true on ' + JSON.stringify(thing);
            it(should, function() {
                expect(isIntegerKey(thing)).to.equal(true);
            });
        });

        thingsThatShouldReturnFalse.forEach(function(thing) {
            var should = 'should return false on ' + JSON.stringify(thing);
            it(should, function() {
                expect(isIntegerKey(thing)).to.equal(false);
            });
        });
    });

    describe('maybeIntegerKey', function() {
        thingsThatShouldReturnTrue.forEach(function(thing) {
            var should = 'should return true on ' + JSON.stringify(thing);
            it(should, function() {
                expect(maybeIntegerKey(thing)).to.be.a("number");
            });
        });

        thingsThatShouldReturnFalse.forEach(function(thing) {
            var should = 'should return false on ' + JSON.stringify(thing);
            it(should, function() {
                expect(maybeIntegerKey(thing)).to.be.undefined;
            });
        });
    });
});
