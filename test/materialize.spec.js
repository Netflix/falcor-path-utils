var materialize = require('./materialize');
var expect = require('chai').expect;

describe('materialize', function() {
    it('materializes a simple path', function() {
        var out = materialize(['a', 1, 'b'], null);
        expect(out).to.deep.equal({ a: { '1': { b: null } } });
    });
    it('materializes a pathSet', function() {
        var out = materialize([[{ from: 0, to: 1 }, 'a']], null);
        expect(out).to.deep.equal({ '0': null, '1': null, a: null });
    });
});
