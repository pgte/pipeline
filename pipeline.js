function cloneStack(stack) {
  var ret = [];
  for(var i=0; i < stack.length; i++) {
    ret.push(stack[i])
  }
  return ret
}

function Pipeline(stack) {
  stack || (stack = [])

  function add(stream) {
    stack.push(stream)
  }

  function pipe() {
    if (stack.length < 2) { throw new Error('Nothing to pipe. Pipeline has ' + stack.length + ' streams') }
    var clonedStack = cloneStack(stack);
    while(clonedStack.length > 1) {
      var src = clonedStack.shift()
      var dest = clonedStack[0]
      src.pipe(dest);
    }
  }

  add.pipe = pipe

  return add
}

module.exports = Pipeline