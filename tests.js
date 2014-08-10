var queryExtend = require('./queryExtend');
var expect = require('expect.js');

describe('queryExtend', function() {
  it('should return the correct query', function() {
    expect(queryExtend('?per_page=2')).to.be.equal('?per_page=2');
    expect(queryExtend('?per_page=2', { per_page: 3 })).to.be.equal('?per_page=3');
    expect(queryExtend('?per_page=2', '?per_page=3')).to.be.equal('?per_page=3');
    expect(queryExtend('?', { per_page: 3 })).to.be.equal('?per_page=3');
    expect(queryExtend({ per_page: undefined })).to.be.equal('?per_page');
    expect(queryExtend('http://whatever.com/?per_page')).to.be.equal('http://whatever.com/?per_page');
    expect(queryExtend('http://whatever.com/', { per_page: 3 })).to.be.equal('http://whatever.com/?per_page=3');
    expect(queryExtend('?', { per_page: 3 }, { per_page: 4 })).to.be.equal('?per_page=4');
    expect(queryExtend({ per_page: 3, page: 2 })).to.be.equal('?per_page=3&page=2');
    expect(queryExtend({ per_page: 3, page: 2, foo: '?' })).to.be.equal('?per_page=3&page=2&foo=%3F');
    expect(queryExtend('http://whatever.com/?test=%3F', { per_page: 3 })).to.be.equal('http://whatever.com/?test=%3F&per_page=3');
    expect(queryExtend()).to.be.equal('');
  });
});