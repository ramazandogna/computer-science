/**
 * ============================================================================
 * CLOSURES, SCOPE, HOISTING & THE TDZ
 * Run me:  node src/02-closures-scope.js   (or: pnpm closures)
 * ============================================================================
 *
 * A CLOSURE is a function bundled with the lexical environment it was DEFINED
 * in. The function keeps a live reference to those outer variables even after
 * the outer function has returned. This is not a feature you opt into — every
 * function in JS is a closure over its surrounding scope.
 */

// --- 1. The canonical closure: a private counter ----------------------------
// `count` is not reachable from outside. The returned functions close over it.
// This is how you get encapsulation/"private state" without classes.
function makeCounter() {
  let count = 0; // lives as long as the returned closures reference it
  return {
    increment: () => ++count,
    value: () => count,
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
console.log('1. closure private state ->', counter.value()); // 2

// --- 2. The classic loop bug: var vs let ------------------------------------
// INTERVIEW CLASSIC. With `var`, there is ONE function-scoped binding shared by
// every iteration. By the time the async callbacks run, the loop has finished
// and that single binding holds its final value.
const withVar = [];
for (var i = 0; i < 3; i++) {
  withVar.push(() => i); // all three close over the SAME `i`
}
console.log('2a. var loop ->', withVar.map((fn) => fn())); // [3, 3, 3]

// `let` is block-scoped: each iteration gets a FRESH binding, so each closure
// captures its own value. This is the modern fix (pre-ES6 you used an IIFE).
const withLet = [];
for (let j = 0; j < 3; j++) {
  withLet.push(() => j);
}
console.log('2b. let loop ->', withLet.map((fn) => fn())); // [0, 1, 2]

// --- 3. Hoisting & the Temporal Dead Zone (TDZ) -----------------------------
// `var` declarations are hoisted and initialized to `undefined`.
// `let`/`const` are ALSO hoisted, but NOT initialized — accessing them before
// their declaration throws. That window is the TDZ.
console.log('3a. var before declaration ->', hoistedVar); // undefined (no throw)
var hoistedVar = 'set later';

try {
  // Reading `notYet` here is inside its TDZ -> ReferenceError.
  console.log(notYet);
} catch (err) {
  console.log('3b. TDZ access ->', err.constructor.name); // ReferenceError
}
let notYet = 'value';

// FUNCTION declarations are fully hoisted (callable before their line);
// function EXPRESSIONS assigned to let/const/var are not.
console.log('3c. hoisted fn decl ->', hoistedFn()); // works
function hoistedFn() { return 'I am callable above my definition'; }

// --- 4. A real-world closure: memoization -----------------------------------
// The cache `Map` is private to `memoize`'d functions and persists across calls
// precisely because of closure. This pattern is everywhere (selectors, React).
function memoize(fn) {
  const cache = new Map(); // closed over by the returned function
  return (arg) => {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

let calls = 0;
const slowSquare = (n) => { calls++; return n * n; };
const fastSquare = memoize(slowSquare);
fastSquare(4);
fastSquare(4); // served from cache; slowSquare not called again
console.log('4. memoize underlying calls ->', calls); // 1

/**
 * INTERVIEW POINTS
 * - "What is a closure?" -> function + the lexical scope it was defined in,
 *   retained after the outer scope returns. Used for privacy, memoization,
 *   currying, event handlers, and (the dark side) accidental memory leaks when
 *   a closure pins a large object alive longer than expected.
 * - "var vs let/const?" -> scope (function vs block), hoisting init (undefined
 *   vs TDZ), and reassignment (const forbids reassignment, NOT mutation:
 *   `const a = []; a.push(1)` is legal).
 * - "Why does the var loop log [3,3,3]?" -> one shared binding; closures capture
 *   the variable, not its value-at-creation.
 */
