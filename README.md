# Pipeline [![Build Status](https://secure.travis-ci.org/pgte/pipeline.png)](http://travis-ci.org/pgte/pipeline)

Allows you to build a chain of streams and pipe them together.

## Setting up a pipeline:

```javascript
var Pipeline = require('pipeline')
  , fs = require('fs')
  , zlib = require('zlib')
  ;


var pipeline = Pipeline(
    fs.createReadStream('./read_from_this_file')
  , zlib.createGzip()
  , fs.createWriteStream('./write_to_this_file')
);

pipeline.pipe();
```

## You can also build the pipeline interactively:

```javascript
var pipeline = Pipeline()

pipeline.push(fs.createReadStream('./read_from_this_file'))
pipeline.push(fs.createWriteStream('./write_to_this_file'))

pipeline.pipe()
```

## Adding a stream before the final target stream:

```javascript
var Pipeline = require('pipeline')
  , fs = require('fs')
  , zlib = require('zlib')
  ;


var pipeline = Pipeline(
    fs.createReadStream('./read_from_this_file')
  , fs.createWriteStream('./write_to_this_file')
);

pipeline.beforeLast(zlib.createGzip())

pipeline.pipe();
```

## Adding a stream right after the first stream

```javascript
var Pipeline = require('pipeline')
  , fs = require('fs')
  , zlib = require('zlib')
  ;


var pipeline = Pipeline(
    fs.createReadStream('./read_from_this_file')
  , fs.createWriteStream('./write_to_this_file')
);

pipeline.afterFirst(zlib.createGzip())

pipeline.pipe();
```

## Adding a destination stream:

```javascript
var Pipeline = require('pipeline')
  , fs = require('fs')
  , zlib = require('zlib')
  ;


var pipeline = Pipeline(
    fs.createReadStream('./read_from_this_file')
);

pipeline.dest(fs.createWriteStream('./write_to_this_file'))

pipeline.pipe();
```

## Adding a source stream:

```javascript
var Pipeline = require('pipeline')
  , fs = require('fs')
  , zlib = require('zlib')
  ;


var pipeline = Pipeline(
  fs.createWriteStream('./write_to_this_file')
);

pipeline.source(fs.createReadStream('./read_from_this_file'))

pipeline.pipe();
```

# License

(The MIT License)

Copyright (c) 2011 Pedro Teixeira. http://about.me/pedroteixeira

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.