function cloneStack(stack) {
  var ret = [];
  for(var i=0; i < stack.length; i++) {
    ret.push(stack[i])
  }
  return ret
}

function Pipeline(stack) {
  stack || (stack = [])
  if (! Array.isArray(stack)) {
    stack = Array.prototype.slice.apply(arguments)
  }

  function push(stream) {
    stack.push(stream)
  }

  function beforeLast(stream) {
    if (stack.length < 1) { throw new Error('Must have at least one stream already') }
    stack.splice(stack.length - 1, 0, stream)
  }

  function afterFirst(stream) {
    if (stack.length < 1) { throw new Error('Must have at least one stream already') }
    stack.splice(1, 0, stream)
  }

  function source(source) {
    stack.splice(0, 0, source)
  }

  function pipe() {
    var result;
    
    if (stack.length < 2) { throw new Error('Nothing to pipe. Pipeline has ' + stack.length + ' streams') }
    var clonedStack = cloneStack(stack);
    while(clonedStack.length > 1) {
      var src = clonedStack.shift()
      var dest = clonedStack[0]
      //console.log('piping %j into %j', src, dest)
      result = src.pipe(dest);
    }
    
    return result
  }

  function clone() {
    return Pipeline(cloneStack(stack))
  }

  push.pipe = pipe
  push.beforeLast = beforeLast
  push.afterFirst = afterFirst
  push.source = source
  push.dest = push
  push.clone = clone

  return push
}

module.exports = Pipeline