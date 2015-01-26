# query-extend

Like _.extend, just for URL queries.

## Usage

```javascript

var queryExtend = require('query-extend');

queryExtend('http://foo.com', { per_page: 20, page: 1 });
// => http://foo.com?per_page=20&page=1

queryExtend('http://foo.com?per_page=10', { per_page: 20, page: 1 });
// => http://foo.com?per_page=20&page=1

queryExtend('http://foo.com?per_page=10', { per_page: 20, tags: ['shoes', 'shirts'] });
// => http://foo.com?per_page=20&tags[]=shoes&tags[]=shirts

queryExtend('http://foo.com?per_page=10', '?per_page=50');
// => http://foo.com?per_page=50

queryExtend('http://foo.com?per_page=10', '?per_page=50', { per_page: 20 });
// => http://foo.com?per_page=20

// Passing in 'true' as last parameter makes
// queryExtend return the result as Object
queryExtend('?per_page=10', '?per_page=50', true);
// => { per_page: '50' }

// ... I think you get it.. :)

```

## Installation

### npm

```npm install query-extend```

### bower

```bower install query-extend```


## Contribution

1. __Setup__: Run `npm install`.

2. __Testing__: Run `npm test` to see if the tests pass.

3. __Minify__: Run `gulp`.


## License
Copyright (c) 2014 Simon Kusterer
Licensed under the MIT license.