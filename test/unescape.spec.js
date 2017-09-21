var unescape = require('./../lib/unescape');
var expect = require('chai').expect;

describe('unescape', function() {
    it('should remove the leading underscore from strings.', function() {
        expect(unescape("_test")).to.equal("test");
    });
    it('should throw if input string does not have leading underscore.', function() {
        expect(function() { return unescape("test") }).to.throw(SyntaxError, "Expected \"_\".");
    });
});
