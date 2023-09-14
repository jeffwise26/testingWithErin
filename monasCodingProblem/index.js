const input = "3[A]2[3[B]]C"
const desiredOutput = "AAABBBBBBC"

// first attempt, going forwards, might contain some bugs
// but it at least works on the prompted input
// pretty darn ugly though
function convert(input) {
  if (!input.includes('[')) {
    return input
  }

  const first = input.slice(0, input.indexOf('['))
  // console.log(`first ${first}`)

  const number = Number(first)

  if (number == NaN) {
    return number
  }
  
  const next = input.slice(input.indexOf('[') + 1, input.indexOf(']') + 1)
  // console.log(`next ${next}`)

  if (next.includes('[')) {
    const remaining = input.slice(input.lastIndexOf(']') + 1, input.length)
    // console.log(`remaining ${remaining}`)
    return convert(next).repeat(number) + convert(remaining)
  }

  const rest = input.slice(input.indexOf(']') + 1, input.length)
  // console.log(`rest ${rest}`)
  return next.slice(0, next.length - 1).repeat(number) + convert(rest)

}

// much better, second go at things 
// reverse polish notation inspired this solution
// https://en.wikipedia.org/wiki/Reverse_Polish_notation
// the key thing is "going backwards" and using a stack data structure
// https://en.wikipedia.org/wiki/Stack_(abstract_data_type)
// I've only tried it on the single input, so it might break on some
// edge cases, but it looks much better than the first one
const stack = []
function backwards(input) {
  for (var i = input.length - 1; i >= 0; i--) {
    const k = Number(input[i])
    // console.log(`k ${k}`)
    if (k) {
      const s = stack.pop()
      const repeat = s.repeat(k)
      // console.log(`repeat ${repeat}`)
      stack.push(repeat)
    } else if (input[i] != ']' && input[i] != '[') {
      stack.push(input[i])
    }
  }
}

// backwards() fills our stack in reverse order
// like so: [ 'C', 'BBBBBB', 'AAA' ]
// which could be improved so we don't need this
// but this prints things to satisfy the problem statement
function printStack() {
  var output = ""
  for (var i = stack.length -1; i >=0; i--) {
    output += stack[i] 
  }
  return output
}

// run all functions and print things
backwards(input)
console.log("stack after 'backwards()':")
console.log(stack)
console.log("stack printed pretty:")
console.log(printStack())
console.log(`output from ugly convert() function: ${convert(input)}`)
