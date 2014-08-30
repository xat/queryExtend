!function(glob) {

  var queryToObject = function(query) {
    var obj = {};
    if (!query) return obj;
    query.split('&')
      .forEach(function(val) {
        var pieces = val.split('=');
        var key = parseKey(pieces[0]);
        var keyDecoded = decodeURIComponent(key.val);
        var valDecoded = pieces[1] && decodeURIComponent(pieces[1]);

        if (key.type === 'array') {
          if (!obj[keyDecoded]) obj[keyDecoded] = [];
          obj[keyDecoded].push(valDecoded);
        } else if (key.type === 'string') {
          obj[keyDecoded] = valDecoded;
        }
      });
    return obj;
  };

  var objectToQuery = function(obj) {
    var pieces = [], encodedKey;
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      if (typeof obj[k] === 'undefined') {
        pieces.push(encodeURIComponent(k));
        continue;
      }
      encodedKey = encodeURIComponent(k);
      if (isArray(obj[k])) {
        obj[k].forEach(function(val) {
          pieces.push(encodedKey + '[]=' + encodeURIComponent(val));
        });
        continue;
      }
      pieces.push(encodedKey + '=' + encodeURIComponent(obj[k]));
    }
    return pieces.length ? ('?' + pieces.join('&')) : '';
  };

  // for now we will only support string and arrays
  var parseKey = function(key) {
    var pos = key.indexOf('[');
    if (pos === -1) return { type: 'string', val: key };
    return { type: 'array', val: key.substr(0, pos) };
  };

  function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  }

  var extract = function(url) {
    var pos = url.lastIndexOf('?');
    var hasQuery = pos !== -1;
    var base = void 0;

    if (hasQuery && pos > 0) {
      base = url.substring(0, pos);
    } else if (!hasQuery && (url && url.length > 0)) {
      base = url;
    }

    return {
      base: base,
      query: hasQuery ? url.substring(pos+1) : void 0
    };
  };

  // thanks raynos!
  // https://github.com/Raynos/xtend
  function extend() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  var queryExtend = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var base = '';

    if (!args.length) {
      return base;
    }

    var normalized = args.map(function(param) {
      if (typeof param === 'string') {
        var extracted = extract(param);
        if (extracted.base) base = extracted.base;
        return queryToObject(extracted.query);
      }
      return param;
    });

    return base + objectToQuery(extend.apply(extend, normalized));
  };

  // Node.js / browserify
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = queryExtend;
  }
  // <script>
  else {
    glob.queryExtend = queryExtend;
  }

}(this);