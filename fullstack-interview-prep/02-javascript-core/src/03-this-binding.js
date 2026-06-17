/**
 * ============================================================================
 * `this` BINDING — where most "JS feels random" confusion actually lives.
 * Run me:  node src/03-this-binding.js   (or: pnpm this)
 * ============================================================================
 *
 * `this` is NOT lexical for normal functions. It is determined by HOW a
 * function is CALLED, not where it is defined. Resolve it with this priority:
 *
 *   1. `new`            -> `this` is the brand-new object.
 *   2. explicit bind    -> .call/.apply/.bind set `this` to the given value.
 *   3. method call      -> `obj.fn()` sets `this` to `obj` (the thing left of the dot).
 *   4. plain call       -> `fn()` -> `this` is undefined (strict mode) / global (sloppy).
 *
 * ARROW FUNCTIONS break this rule on purpose: they have NO own `this`. They
 * capture `this` LEXICALLY from the enclosing scope at definition time. That's
 * why arrows are the fix for "lost this" in callbacks.
 */

'use strict'; // so a plain call gives `this === undefined`, not the global object

const user = {
  name: 'Ada',
  // Method call: `this` is `user` because of the dot.
  greet() {
    return `Hi, I'm ${this.name}`;
  },
  // GOTCHA: an arrow as a METHOD captures `this` from the module scope (not
  // `user`), so `this.name` is undefined. Don't use arrows for object methods.
  greetArrow: () => `this.name is ${this?.name}`,
};

console.log('1. method call ->', user.greet()); // Hi, I'm Ada
console.log('2. arrow method ->', user.greetArrow()); // this.name is undefined

// --- 3. Losing `this` by detaching the method -------------------------------
// `greet` is now a bare function reference. Calling it loses the `user` receiver.
const detached = user.greet;
try {
  detached(); // `this` is undefined in strict mode -> reading .name throws
} catch (err) {
  console.log('3. detached method ->', err.constructor.name); // TypeError
}

// --- 4. Fixing it three ways ------------------------------------------------
console.log('4a. call  ->', user.greet.call({ name: 'Grace' }));   // borrow with explicit this
console.log('4b. apply ->', user.greet.apply({ name: 'Linus' }));  // like call, args as array
const bound = user.greet.bind({ name: 'Margaret' });               // returns a new permanently-bound fn
console.log('4c. bind  ->', bound());

// call vs apply: identical except how args are passed.
function introduce(role, team) { return `${this.name}: ${role} on ${team}`; }
console.log('4d. call args ->', introduce.call(user, 'Eng', 'Core'));        // comma-separated
console.log('4e. apply args ->', introduce.apply(user, ['Eng', 'Core']));    // single array

// --- 5. The callback trap and the arrow fix ---------------------------------
class Timer {
  constructor() {
    this.seconds = 0;
  }
  // A regular function passed to setInterval would be called as a plain fn,
  // so `this` would be undefined. The ARROW captures `this` from `start`,
  // which is the Timer instance. This is THE reason arrows exist.
  start() {
    // Using a synchronous demo instead of a real timer so the script exits.
    const tick = () => { this.seconds++; };
    tick(); tick(); tick();
    return this.seconds;
  }
}
console.log('5. arrow keeps instance this ->', new Timer().start()); // 3

/**
 * INTERVIEW POINTS
 * - "How is `this` determined?" -> by call-site, via the new/bind/method/plain
 *   priority above. Arrows ignore all of it and inherit lexically.
 * - "call vs apply vs bind?" -> call/apply invoke immediately (args spread vs
 *   array); bind returns a new function with `this` (and optionally leading
 *   args, i.e. partial application) permanently fixed.
 * - "Why do React class components do `this.handleClick = this.handleClick
 *   .bind(this)` in the constructor (or use class fields = arrows)?" -> because
 *   passing the method as an event handler detaches it from the instance.
 */
