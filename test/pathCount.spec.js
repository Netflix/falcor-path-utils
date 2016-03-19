var getPathCount = require('../lib/pathCount');
var expect = require('chai').expect;

describe('pathCount', function() {

    it('should return 1 for the correct count: ["lomo", 2, 6, "name"]', function() {
        var count = getPathCount(["lomo", 2, 6, "name"]);
        expect(count).to.equals(1);
    });

    it('should thow if "to" is a string containing an integer.', function() {
        try {
            getPathCount(["lomo", {from: 0, to: "1"}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, 'to' is not an integer: {\"from\":0,\"to\":\"1\"}");
        }
    });


    it('should thow if "to" is not an integer in a range.', function() {
        try {
            getPathCount(["lomo", {from: 0, to: "hello"}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, 'to' is not an integer: {\"from\":0,\"to\":\"hello\"}");
        }
    });

    it('should throw if "from" is not an integer in range.', function() {
        try {
            getPathCount(["lomo", {from: [], to: 0}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, 'from' is not an integer: {\"from\":[],\"to\":0}");
        }
    });

    it('should throw if "length" is not an integer in range.', function() {
        try {
            getPathCount(["lomo", {from: 0, length: {}}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, 'length' is not an integer: {\"from\":0,\"length\":{}}");
        }
    });

    it('should throw if neither "to" nor "length" is found in range.', function() {
        try {
            getPathCount(["lomo", {}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {}");
        }
    });

    it('should return 7 for ["lolomo", [{from:7, to: 9}, {from: 70, to: 72}, 10], "name"]', function() {
        var count = getPathCount(["lolomo", [{from:7, to: 9}, {from: 70, to: 72}, 10], "name"]);
        expect(count).to.equals(7)
    });

    it('should return 50 for  ["lomo", {from: 6, length: 10}, 6, ["hi", {length: 4}], "name"]', function() {
        var count = getPathCount(["lomo", {from: 6, length: 10}, 9, ["hi", {length: 4}], "name"]);
        expect(count).to.equals(50);
    });

    it("should return 1 for ['key1']", function() {
        var count = getPathCount(["key"]);
        expect(count).to.equals(1);
    });

    it("should return 2 for [['key1a','key1b']]", function() {
        var count = getPathCount([['key1a','key1b']]);
        expect(count).to.equals(2);
    });

    it("should return 10001 for ['key1', {'from': 0, 'to': 10000}, 'key3']", function() {
        var count = getPathCount(['key1', {'from': 0, 'to': 10000}, 'key3']);
        expect(count).to.equals(10001);
    });

    it("should return 1 for ['key1', 'key2', 'key3']", function() {
        var count = getPathCount(['key1', 'key2', 'key3']);
        expect(count).to.equals(1);
    });

    it("should return 2 for ['key1', ['key2a', 'key2b'], 'key3']", function() {
        var count = getPathCount(['key1', ['key2a', 'key2b'], 'key3']);
        expect(count).to.equals(2);
    });

    it("should return 6 for ['key1', {from:0, to:5}, 'key3']", function() {
        var count = getPathCount(['key1', {from:0, to:5}, 'key3']);
        expect(count).to.equals(6);
    });

    it("should return 12 for ['key1', {from:0, to:5}, ['key3a', 'key3b']]", function() {
        var count = getPathCount(['key1', {from:0, to:5}, ['key3a', 'key3b']]);
        expect(count).to.equals(12);
    });

    it("should return 24 for ['key1', {from:0, to:5}, [{from:0, to:2}, 'key3b']]", function() {
        var count = getPathCount(['key1', {from:0, to:5}, [{from:0, to:2}, 'key3b']]);
        expect(count).to.equals(24);
    });

    it("should return 3 for [['key1a', 'key1b', 'key1c'], 'key3', 'key4']", function() {
        var count = getPathCount([['key1a', 'key1b', 'key1c'], 'key3', 'key4']);
        expect(count).to.equals(3);
    });

    it("should return 24 for [['key1a', 'key1b'], ['key3a', 'key3b'], {'from': 0, 'to': 5}]", function() {
        var count = getPathCount([['key1a', 'key1b'], ['key3a', 'key3b'], {'from': 0, 'to': 5}]);
        expect(count).to.equals(24);
    });

    it("should return 10 for ['key1', {'to': 9}]", function() {
        var count = getPathCount(['key1', {'to': 9}]);
        expect(count).to.equals(10);
    });

    it("should return 1 for ['key1', {'from': 1, 'to': 1}]", function() {
        var count = getPathCount(['key1', {'from': 1, 'to': 1}]);
        expect(count).to.equals(1);
    });

    it("should return 15 for ['key1', {'to': 2}, {'to': 4}]", function() {
        var count = getPathCount(['key1', {'to': 2}, {'to': 4}]);
        expect(count).to.equals(15);
    });

    it("should throw for invalid path: ['key1', {from:0}, 'key3']", function() {
        try {
            count = getPathCount(['key1', {from:0}, 'key3']);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected \'to\' or \'length\': {\"from\":0}");
        }
    });

    it("should throw for invalid path: ['key1', {}, 'key3']", function() {
        try {
            count = getPathCount(['key1', {}, 'key3']);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {}");
        }
    });

    it("should throw for  invalid path: ['key1', [{}, 'key3']]", function() {
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

    it("should return 1 for {from:0, to:0}", function() {
        var count = getPathCount([{from:0, to:0}]);
        expect(count).to.equals(1);
    });

    it("should return 1 for {from:7, to:7}", function() {
        var count = getPathCount([{from:7, to:7}]);
        expect(count).to.equals(1);
    });

    it("should return 5 for {from:1, to:5}", function() {
        var count = getPathCount([{from:1, to:5}]);
        expect(count).to.equals(5);
    });

    it("should return 0 for {from:1, to:0} is 0", function() {
        var count = getPathCount([{from:1, to:0}]);
        expect(count).to.equals(0);
    });

    it("should throw for invalid range {from:2}", function() {
        try {
            getPathCount([{from:2}]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {\"from\":2}");
        }
    });

    it("should throw for invalid range {foo:1, bar:2}", function() {
        try {
            getPathCount([{foo:1, bar:2}]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {\"foo\":1,\"bar\":2}");
        }
    });

    it("should throw for invalid range {}", function() {
        try {
            getPathCount([{}]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {}");
        }
    });    

});
