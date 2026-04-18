/* eslint-disable strict */
// This file intentionally violates as many core ESLint rules as possible.
// Each violation has a same-line comment identifying the rule.

var unused = "hello"; // violates: no-var, no-unused-vars, quotes
var x = 10; // violates: no-var, prefer-const

if (x == 10) { // violates: eqeqeq
  console.log("x is 10"); // violates: no-console, quotes
}

var y = 5;; // violates: no-var, no-extra-semi

let z = 42 // violates: semi, prefer-const

eval("var a = 1"); // violates: no-eval, quotes

var fn = new Function("a", "b", "return a + b"); // violates: no-new-func, no-var, quotes

var bits = x | y; // violates: no-bitwise, no-var

var ternary = x > 5 ? y > 2 ? "a" : "b" : "c"; // violates: no-nested-ternary, no-var, quotes

for (var key in { a: 1 }) { // violates: no-restricted-syntax (ForInStatement), no-var
  console.log(key); // violates: no-console
}

for (var item of [1, 2, 3]) { // violates: no-restricted-syntax (ForOfStatement), no-var
  console.log(item); // violates: no-console
}

with (Math) { // violates: no-with
  console.log(PI); // violates: no-console
}

loop: // violates: no-labels
for (var i = 0; i < 10; i++) { // violates: no-var
  if (i === 5) break loop; // violates: no-labels
}

switch (x) { // violates: default-case (no default)
  case 1:
    break;
  case 2:
    break;
}

var counter = 0; // violates: no-var
counter++; // violates: no-plusplus (outside for loop)

void 0; // violates: no-void

var proto = {}.__proto__; // violates: no-proto, no-var

var multiLine = "line1\
line2"; // violates: no-multi-str, no-var, quotes

if (42 === x) { // violates: yoda
  alert("yoda"); // violates: no-alert, quotes
}

debugger; // violates: no-debugger

if (x) {} // violates: no-empty (empty block statement)

try {
  throw "error string"; // violates: no-throw-literal, quotes
} catch (e) {
}

function mutateParam(param) { // violates: no-unused-vars (function never called)
  param = 10; // violates: no-param-reassign
  param.foo = "bar"; // violates: no-param-reassign, quotes
  return param;
}

var wrapped = new String("hello"); // violates: no-new-wrappers, no-var, quotes

var escaped = "hello\!world"; // violates: no-useless-escape, no-var, quotes

var parsed = parseInt("10"); // violates: radix, no-var, quotes

async function example() { // violates: no-unused-vars
  return await Promise.resolve(1); // violates: no-return-await
}

var decimal = .5; // violates: no-floating-decimal, no-var

var a, b, c; // violates: no-var
a = b = c = 5; // violates: no-multi-assign

if (x > 5) {
  console.log("big"); // violates: no-console, quotes
} else { // violates: brace-style (else on same line as })
  if (x > 2) { // violates: no-lonely-if
    console.log("medium"); // violates: no-console, quotes
  }
}

var obj = {foo :"bar" ,baz:"qux"}; // violates: key-spacing, comma-spacing, no-var, quotes

var sum = x+y; // violates: space-infix-ops, no-var

if (x){ // violates: space-before-blocks
  console.log(x) // violates: no-console, semi
}

function callee() { return arguments.callee; } // violates: no-restricted-properties (arguments.callee)

var thisIsAnExtremelyLongVariableName = "this line is intentionally very long to exceed the maximum line length of one hundred and twenty characters"; // violates: max-len, no-var, quotes

// --- New ESLint 9+ rules ---

// no-object-constructor
var constructed = new Object(); // violates: no-object-constructor, no-var

// no-constant-binary-expression
var alwaysFalse = {} === null; // violates: no-constant-binary-expression, no-var
var alwaysString = "hello" || "world"; // violates: no-constant-binary-expression, no-var

// no-empty-static-block
class EmptyStaticBlock {
  static {}
}

// no-unused-private-class-members
class UnusedPrivateMembers {
  #unusedField = 42;
  #unusedMethod() { return 1; }
  getPublic() { return 0; }
}

// no-new-native-nonconstructor
var badSymbol = new Symbol("bad"); // violates: no-new-native-nonconstructor, no-var

// @stylistic/multiline-ternary (config: "never" = must be single line)
var multilineTern = x > 5
  ? "big"
  : "small"; // violates: @stylistic/multiline-ternary, no-var, quotes

// @stylistic/comma-dangle (config: "only-multiline" = single-line trailing comma is bad)
var trailingComma = [1, 2, 3,]; // violates: @stylistic/comma-dangle, no-var

// @stylistic/max-len (code: 120, ignoreStrings/ignoreComments, so use long code without strings)
var resultOfVeryLongExpression = thisIsAnExtremelyLongVariableName + constructed + alwaysFalse + alwaysString + badSymbol + multilineTern + trailingComma;