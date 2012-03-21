# Pipeline [![Build Status](https://secure.travis-ci.org/pgte/pipeline.png)](http://travis-ci.org/pgte/pipeline)

Allows you to build a chain of streams and pipe them together.

Usage:

```javascript
var Pipeline = require('pipeline')
  , fs = require('fs')
  , zlib = require('zlib')
  ;


var pipeline = Pipeline([
    fs.createReadStream('./read_from_this_file')
  , zlib.createGzip()
  , fs.createReadStream('./read_from_this_file')
]);

pipeline.pipe();
```