var test = require('tap').test
  , Pipeline = require('../')
  , fs = require('fs')
  , BufferedStream = require('bufferedstream')
  , Transformation = require('./transformation')
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
  var p = Pipeline([fs.createReadStream(__dirname + '/fixtures/ABCDEF')])
  try {
    p.pipe()
  } catch(err) {
    t.equal('Nothing to pipe. Pipeline has 1 streams', err.message)
    t.end()
  }
});

test('streams 2 streams', function(t) {
  var src = fs.createReadStream(__dirname + '/fixtures/ABCDEF')
  var dest = new BufferedStream

  dest.setEncoding('utf8')
  dest.resume()
  dest.on('data', function(d) {
    t.equal('ABCDEF', d)
    t.end()
  });

  Pipeline([
      src
    , dest
  ]).pipe()

});

test('streams 3 streams', function(t) {
  var src = fs.createReadStream(__dirname + '/fixtures/ABCDEF')
  var dest1 = new BufferedStream
  var dest2 = new BufferedStream

  dest2.setEncoding('utf8')
  dest2.on('data', function(d) {
    t.equal('ABCDEF', d)
    t.end()
  });

  
  Pipeline(
      src
    , dest1
    , dest2
  ).pipe()

})


test('can add before last', function(t) {
  var src = fs.createReadStream(__dirname + '/fixtures/ABCDEF', {encoding: 'utf8'})
  
  var dest = new BufferedStream
  dest.setEncoding('utf8')
  
  var middle = new Transformation(function(d) {
    return d.toLowerCase()
  })

  var pipeline = Pipeline(src, dest)
  pipeline.beforeLast(middle)

  dest.on('data', function(d) {
    t.equal(d, 'abcdef')
    t.end()
  })

  pipeline.pipe()

})

test('can add after first last', function(t) {
  var src = fs.createReadStream(__dirname + '/fixtures/ABCDEF', {encoding: 'utf8'})
  
  var dest = new BufferedStream
  dest.setEncoding('utf8')
  
  var middle = new Transformation(function(d) {
    return d.toLowerCase()
  })

  var pipeline = Pipeline(src, dest)
  pipeline.afterFirst(middle)

  dest.on('data', function(d) {
    t.equal(d, 'abcdef')
    t.end()
  })

  pipeline.pipe()

})