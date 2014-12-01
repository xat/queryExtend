var queryExtend = require('./query-extend');
var expect = require('expect.js');

describe('query-extend', function() {
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
    expect(queryExtend({ my_array: [1,2], my_other_array: [3] })).to.be.equal('?my_array[]=1&my_array[]=2&my_other_array[]=3');
    expect(queryExtend('?my_array[]=1&my_array[]=2&my_array[]=3', { my_array: [5] })).to.be.equal('?my_array[]=5');
    expect(queryExtend('?per_page=2&foo=bar', '?foo=test', true).foo).to.be.equal('test');
    expect(queryExtend('?foo[]=bar', true).foo[0]).to.be.equal('bar');
  });
  it('exports an AMD module', function(done) {
    var requirejs = require('requirejs');
    requirejs.config({
      baseUrl : '.'
    });
    requirejs(['query-extend'], function(queryExtend){
      expect(queryExtend).to.be.a(Function);
      done();
    });
  });
});