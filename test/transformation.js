var BufferedStream = require('bufferedstream')
  , inherits = require('util').inherits
  ;

function Transformation(callback) {
  BufferedStream.apply(this)
  this.callback = callback
}

inherits(Transformation, BufferedStream)

Transformation.prototype.write = function write(d) {
  d = this.callback.call({}, d)
  BufferedStream.prototype.write.call(this, d)
}

module.exports = Transformation