var getPathCount = require('../lib/pathCount');
var expect = require('chai').expect;

describe('pathCount-groovytests', function() {

    it("getPathCount for ['key1']", function() {
        var count = getPathCount(["key"]);
        expect(count).to.equals(1);
    });

    it("getPathCount for [['key1a','key1b']]", function() {
        var count = getPathCount([['key1a','key1b']]);
        expect(count).to.equals(2);
    });

    it("getPathCount for ['key1', {'from': 0, 'to': 10000}, 'key3']", function() {
        var count = getPathCount(['key1', {'from': 0, 'to': 10000}, 'key3']);
        expect(count).to.equals(10001);
    });

    it("getPathCount for ['key1', 'key2', 'key3']", function() {
        var count = getPathCount(['key1', 'key2', 'key3']);
        expect(count).to.equals(1);
    });

    it("getPathCount for ['key1', ['key2a', 'key2b'], 'key3']", function() {
        var count = getPathCount(['key1', ['key2a', 'key2b'], 'key3']);
        expect(count).to.equals(2);
    });

    it("getPathCount for ['key1', {from:0, to:5}, 'key3']", function() {
        var count = getPathCount(['key1', {from:0, to:5}, 'key3']);
        expect(count).to.equals(6);
    });

    it("getPathCount for ['key1', {from:0, to:5}, ['key3a', 'key3b']]", function() {
        var count = getPathCount(['key1', {from:0, to:5}, ['key3a', 'key3b']]);
        expect(count).to.equals(12);
    });

    it("getPathCount for ['key1', {from:0, to:5}, [{from:0, to:2}, 'key3b']]", function() {
        var count = getPathCount(['key1', {from:0, to:5}, [{from:0, to:2}, 'key3b']]);
        expect(count).to.equals(24);
    });

    it("getPathCount for [['key1a', 'key1b', 'key1c'], 'key3', 'key4']", function() {
        var count = getPathCount([['key1a', 'key1b', 'key1c'], 'key3', 'key4']);
        expect(count).to.equals(3);
    });

    it("getPathCount for [['key1a', 'key1b'], ['key3a', 'key3b'], {'from': 0, 'to': 5}]", function() {
        var count = getPathCount([['key1a', 'key1b'], ['key3a', 'key3b'], {'from': 0, 'to': 5}]);
        expect(count).to.equals(24);
    });

    it("getPathCount for ['key1', {'to': 9}]", function() {
        var count = getPathCount(['key1', {'to': 9}]);
        expect(count).to.equals(10);
    });

    it("getPathCount for ['key1', {'from': 1, 'to': 1}]", function() {
        var count = getPathCount(['key1', {'from': 1, 'to': 1}]);
        expect(count).to.equals(1);
    });

    it("getPathCount for ['key1', {'to': 2}, {'to': 4}]", function() {
        var count = getPathCount(['key1', {'to': 2}, {'to': 4}]);
        expect(count).to.equals(15);
    });

    it("getPathCount for invalid path: ['key1', {from:0}, 'key3']", function() {
        try {
            count = getPathCount(['key1', {from:0}, 'key3']);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected \'to\' or \'length\': {\"from\":0}");
        }
    });

    it("getPathCount for invalid path: ['key1', {}, 'key3']", function() {
        try {
            count = getPathCount(['key1', {}, 'key3']);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {}");
        }
    });

    it("getPathCount for invalid path: ['key1', [{}, 'key3']]", function() {
        try {
            var count = getPathCount(['key1', [{}, 'key3']]);
            expect(1).to.equals(2);
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {}");
        }
    });

    it("getPathCount for invalid path: ['key1', [['key2a', 'key2b'], 'key2c'], 'key3']", function() {
        try {
            getPathCount(['key1', [['key2a', 'key2b'], 'key2c'], 'key3']);
            expect(1).to.equals(2);
        } catch (e) {
            expect(e.message).to.equals("Unexpected Array found in keySet: [\"key2a\",\"key2b\"]");
        }
    });

    it("getRangeSize for {from:0, to:0}", function() {
        var count = getPathCount([{from:0, to:0}]);
        expect(count).to.equals(1);
    });

    it("getRangeSize for {from:7, to:7}", function() {
        var count = getPathCount([{from:7, to:7}]);
        expect(count).to.equals(1);
    });

    it("getRangeSize for {from:1, to:5}", function() {
        var count = getPathCount([{from:1, to:5}]);
        expect(count).to.equals(5);
    });

    it("getRangeSize for invalid range {from:2}", function() {
        try {
            getPathCount([{from:2}]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {\"from\":2}");
        }
    });

    it("getRangeSize for invalid range {foo:1, bar:2}", function() {
        try {
            getPathCount([{foo:1, bar:2}]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {\"foo\":1,\"bar\":2}");
        }
    });

    it("getRangeSize for invalid range {}", function() {
        try {
            getPathCount([{}]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {}");
        }
    });

});
