var getPathCount = require('../lib/pathCount');
var expect = require('chai').expect;

describe('pathCount', function() {

    it('should return the correct count: ["lomo", 2, 6, "name"]', function() {
        var count = getPathCount(["lomo", 2, 6, "name"]);
        expect(count).to.equals(1);
    });

    it('should work with string integers too.', function() {
        var count = getPathCount(["lomo", {from: 0, to: "2"}, "info", "name"]);
        expect(count).to.equals(3);
    });

    it('should thow the correct error. (1)', function() {
        try {
            getPathCount(["lomo", {from: 0, to: "hello"}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, 'to' is not an integer: {\"from\":0,\"to\":\"hello\"}");
        }
    });

    it('should thow the correct error. (2)', function() {
        try {
            getPathCount(["lomo", {from: [], to: 0}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, 'from' is not an integer: {\"from\":[],\"to\":0}");
        }
    });

    it('should thow the correct error. (3)', function() {
        try {
            getPathCount(["lomo", {from: 0, length: {}}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, 'length' is not an integer: {\"from\":0,\"length\":{}}");
        }
    });

    it('should thow the correct error. (4)', function() {
        try {
            getPathCount(["lomo", {}, "name"]);
            expect(1).to.equals(2)
        } catch (e) {
            expect(e.message).to.equals("Invalid range, expected 'to' or 'length': {}");
        }
    });

    it('should return the correct count: ["lolomo", [{from:7, to: 9}, {from: 70, to: 72}, 10], "name"]', function() {
        var count = getPathCount(["lolomo", [{from:7, to: 9}, {from: 70, to: 72}, 10], "name"]);
        expect(count).to.equals(7)
    });

    it('should return the correct count: ["lomo", {from: 6, length: 10}, 6, ["hi", {length: 4}], "name"]', function() {
        var count = getPathCount(["lomo", {from: 6, length: 10}, 9, ["hi", {length: 4}], "name"]);
        expect(count).to.equals(50);
    });

});
