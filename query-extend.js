!function(glob) {

  var queryToObject = function(query) {
    var obj = {};
    if (!query) return obj;
    each(query.split('&'), function(val) {
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
        each(obj[k], function(val) {
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

  var isArray = function(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  };

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
  var extend = function() {
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
  };

  var queryExtend = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var asObject = args[args.length-1] === true;
    var base = '';

    if (!args.length) {
      return base;
    }

    if (asObject) {
      args.pop();
    }

    var normalized = map(args, function(param) {
      if (typeof param === 'string') {
        var extracted = extract(param);
        if (extracted.base) base = extracted.base;
        return queryToObject(extracted.query);
      }
      return param;
    });

    if (asObject) {
      return extend.apply({}, normalized);
    } else {
      return base + objectToQuery(extend.apply({}, normalized));
    }

  };
    
  var each = function(arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++) {
      fn(arr[i], i);
    }
  };

  var map = function(arr, fn) {
    var res = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      res.push( fn(arr[i], i) );
    } 
    return res;     
  };

  if (typeof module !== 'undefined' && module.exports) {
    // Node.js / browserify
    module.exports = queryExtend;
  } else if  (typeof define === 'function' && define.amd) {
    // require.js / AMD
    define(function() {
      return queryExtend;
    });
  } else {
    // <script>
    glob.queryExtend = queryExtend;
  }

}(this);