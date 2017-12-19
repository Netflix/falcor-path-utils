var pathUtils = require('..');
var toJsonKey = pathUtils.toJsonKey;
var isJsonKey = pathUtils.isJsonKey;
var maybeJsonKey = pathUtils.maybeJsonKey;
var expect = require('chai').expect;

describe('jsonKey', function () {
    describe('toJsonKey', function () {
        it('should return serialized JSON with sorted keys for objects', function () {
            expect(toJsonKey({
                b: 2,
                a: 1,
                c: 3
            })).to.equal('{"a":1,"b":2,"c":3}');
            expect(toJsonKey({ a: 1 })).to.equal('{"a":1}');
            expect(toJsonKey({ a: 1, b: 2 })).to.equal('{"a":1,"b":2}');
        });

        it('should throw TypeError for non-objects', function () {
            expect(() => toJsonKey('abc')).to.throw(TypeError);
            expect(() => toJsonKey(undefined)).to.throw(TypeError);
            expect(() => toJsonKey(12)).to.throw(TypeError);
            expect(() => toJsonKey(Symbol('foo'))).to.throw(TypeError);
            expect(() => toJsonKey(null)).to.throw(TypeError);
            expect(() => toJsonKey(false)).to.throw(TypeError);
        });

        it('should throw TypeError for non-literal objects', function() {
            expect(() => toJsonKey([1, 2, 3])).to.throw(TypeError);
            expect(() => toJsonKey(new Date())).to.throw(TypeError);
            expect(() => toJsonKey(new Map())).to.throw(TypeError);
            expect(() => toJsonKey(new Int8Array())).to.throw(TypeError);
        });

        it('should throw TypeError when toJSON returns non-object', function() {
            var o = {
                toJSON: function toJSON() {
                    return null;
                }
            }
            expect(() => toJsonKey(o)).to.throw(TypeError);
        });

        it('should allow objects created by custom classes', function() {
            function Config() {
                this.key = "value";
                this.isValid = true;
            }
            expect(toJsonKey(new Config())).to.equal('{"isValid":true,"key":"value"}');
        });

        it('should return "{}" for empty object', function () {
            expect(toJsonKey({})).to.equal('{}');
        });

        it('should work recursively', function () {
            expect(toJsonKey({
                b: 2,
                a: {
                    ab: 1.2,
                    aa: 1.1
                }
            })).to.equal('{"a":{"aa":1.1,"ab":1.2},"b":2}');
        });

        it('should be same for objects with keys created in different order', function () {
            expect(toJsonKey({
                b: 2,
                a: 1
            })).to.equal(toJsonKey({
                a: 1,
                b: 2
            }));

            var obj = { b: 2 };
            obj.a = 1;
            expect(toJsonKey(obj)).to.equal('{"a":1,"b":2}');
        });

        it('should escape strings in values appropriately', function () {
            expect(toJsonKey({ a: "abc\"def" })).to.equal('{"a":"abc\\"def"}');
        });

        it('should escape strings in keys appropriately', function () {
            expect(toJsonKey({ "abc\"def": 1 })).to.equal('{"abc\\"def":1}');
        });

        it('should convert non-string keys to strings', function () {
            expect(toJsonKey({ null: 1 })).to.equal('{"null":1}');
            expect(toJsonKey({ undefined: 1 })).to.equal('{"undefined":1}');
            expect(toJsonKey({ 123: 1 })).to.equal('{"123":1}');
        });
    });

    var thingsThatShouldReturnTrue = [
        '{"valid json":"with no whitespace"}',
        '{"valid":"json"}',
        '{"nested":{"json":true}}',
        '{"key":1}',
        '{"key":null}',
        '{"keys":0,"sorted":1}',
        '{"1":"key"}',
        '{"multiple":1,"types":true,"work":"too"}',
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
        '123',
        '',
        'abc',
        ' {}',
        '{ }',
        ' ',
        '{} ',
        '{invalid json}',
        '{"valid json": "with whitespace"}',
        '{"unsorted":0,"keys":1}',
        '{1:"key"}',
        '{"key":undefined}',
        ' {"valid_json":"with_whitespace_at_start"}',
        '{"valid_json":"with_whitespace_at_end"} ',
        1,
        -0,
        -1,
        0.1,
        -0.1,
        '0.1',
        '-0.1',
    ];

    describe('isJsonKey', function () {
        thingsThatShouldReturnTrue.forEach(function (thing) {
            var should = 'should return true on ' + JSON.stringify(thing);
            it(should, function () {
                expect(isJsonKey(thing)).to.equal(true);
            });
        });

        thingsThatShouldReturnFalse.forEach(function (thing) {
            var should = 'should return false on ' + JSON.stringify(thing);
            it(should, function () {
                expect(isJsonKey(thing)).to.equal(false);
            });
        });
    });

    describe('maybeJsonKey', function () {
        thingsThatShouldReturnTrue.forEach(function (thing) {
            var should = 'should return true on ' + JSON.stringify(thing);
            it(should, function () {
                expect(maybeJsonKey(thing)).to.be.an.instanceof(Object);
            });
        });

        thingsThatShouldReturnFalse.forEach(function (thing) {
            var should = 'should return false on ' + JSON.stringify(thing);
            it(should, function () {
                expect(maybeJsonKey(thing)).to.be.undefined;
            });
        });
    });
});
