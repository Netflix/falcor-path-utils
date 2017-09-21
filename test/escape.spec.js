var escape = require('./../lib/escape');
var expect = require('chai').expect;

describe('escape', function() {
    it('should add a leading underscore to strings.', function() {
        expect(escape("test")).to.equal("_test");
    });
});
