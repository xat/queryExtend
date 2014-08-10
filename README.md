# query-extend

Like _.extend, just for URL queries.

## Usage

```javascript

var queryExtend = require('query-extend');

queryExtend('http://foo.com', { per_page: 20, page: 1 });
// => http://foo.com?per_page=20&page=1

queryExtend('http://foo.com?per_page=10', { per_page: 20, page: 1 });
// => http://foo.com?per_page=20&page=1

queryExtend('http://foo.com?per_page=10', '?per_page=50');
// => http://foo.com?per_page=50

queryExtend('http://foo.com?per_page=10', '?per_page=50', { per_page: 20 });
// => http://foo.com?per_page=20

// ... I think you get it.. :)

```

## Installation

### npm

```npm install query-extend```

### bower

```bower install query-extend```


## License
Copyright (c) 2014 Simon Kusterer
Licensed under the MIT license.