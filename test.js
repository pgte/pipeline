var test = require('tap').test
  , Pipeline = require('./')
  , fs = require('fs')
  , BufferedStream = require('bufferedstream')
  ;

test('does not work with no stream', function(t) {
  var p = Pipeline()
  try {
    p.pipe()
  } catch(err) {
    t.equal('Nothing to pipe. Pipeline has 0 streams', err.message)
    t.end()
  }
});

test('does not work with one stream', function(t) {
  var p = Pipeline([fs.createReadStream('./fixtures/ABCDEF')])
  try {
    p.pipe()
  } catch(err) {
    t.equal('Nothing to pipe. Pipeline has 1 streams', err.message)
    t.end()
  }
});

test('streams 2 streams', function(t) {
  var src = fs.createReadStream('./fixtures/ABCDEF')
  var dest = new BufferedStream
  dest.pause()
  Pipeline([
      src
    , dest
  ]).pipe()

  src.on('end', function() {
    dest.setEncoding('utf8')
    dest.resume()
    dest.on('data', function(d) {
      t.equal('ABCDEF', d)
      t.end()
    });
  });

});

test('streams 4 streams', function(t) {
  var src = fs.createReadStream('./fixtures/ABCDEF')
  var dest1 = new BufferedStream
  var dest2 = new BufferedStream
  var dest3 = new BufferedStream
  dest3.pause()
  
  Pipeline([
      src
    , dest1
    , dest2
    , dest3
  ]).pipe()

  src.on('end', function() {
    dest3.setEncoding('utf8')
    dest3.resume()
    dest3.on('data', function(d) {
      t.equal('ABCDEF', d)
      t.end()
    });
  });

});