/**
 * ============================================================================
 * TYPES, COERCION & EQUALITY — the "why does JS say that?" module.
 * Run me:  node src/06-types-coercion-equality.js   (or: pnpm types)
 * ============================================================================
 *
 * 7 primitives: string, number, bigint, boolean, undefined, symbol, null.
 * Everything else is an object (including arrays and functions). Primitives are
 * IMMUTABLE and compared BY VALUE; objects are compared BY REFERENCE.
 */

// --- 1. Value vs reference --------------------------------------------------
let s1 = 'hi';
let s2 = s1;
s2 = 'bye'; // reassigns the copy; s1 untouched (primitives copy by value)
console.log('1a. primitive copy ->', s1, s2); // hi bye

const o1 = { n: 1 };
const o2 = o1; // copies the REFERENCE, not the object
o2.n = 99; // mutates the single shared object
console.log('1b. object reference ->', o1.n); // 99 — same object

// Equality of objects is identity, not structure:
console.log('1c. ref equality ->', { a: 1 } === { a: 1 }); // false — different objects

// --- 2. == vs === : the rule that ends the debate ---------------------------
// === : strict. No coercion. Compare type AND value. USE THIS.
// ==  : loose. Coerces operands to a common type first, with a gnarly algorithm.
console.log('2a. 0 == ""        ->', 0 == ''); // true  (both -> 0)
console.log('2b. 0 == "0"       ->', 0 == '0'); // true
console.log('2c. "" == "0"      ->', '' == '0'); // false (string compare, no coercion)
console.log('2d. null == undefined ->', null == undefined); // true (special-cased)
console.log('2e. null === undefined ->', null === undefined); // false
// The ONE place `==` is idiomatic: `x == null` matches BOTH null and undefined.
console.log('2f. x == null idiom ->', undefined == null, null == null); // true true

// --- 3. NaN: the value that isn't equal to itself ---------------------------
console.log('3a. NaN === NaN     ->', NaN === NaN); // false (by IEEE-754 spec)
console.log('3b. Number.isNaN    ->', Number.isNaN(NaN)); // true — the correct test
// Object.is is like === but treats NaN as equal to NaN, and -0 distinct from +0.
console.log('3c. Object.is(NaN)  ->', Object.is(NaN, NaN)); // true
console.log('3d. Object.is(0,-0) ->', Object.is(0, -0)); // false

// --- 4. typeof gotchas (memorize these) -------------------------------------
console.log('4a. typeof null      ->', typeof null); // 'object' — a 1995 bug, now permanent
console.log('4b. typeof []        ->', typeof []); // 'object' — use Array.isArray
console.log('4c. typeof function  ->', typeof function () {}); // 'function'
console.log('4d. typeof NaN       ->', typeof NaN); // 'number'
console.log('4e. Array.isArray    ->', Array.isArray([])); // the right way to detect arrays

// --- 5. Truthiness: the 8 falsy values --------------------------------------
// Everything else is truthy — INCLUDING [], {}, "0", "false", and Infinity.
const falsy = [false, 0, -0, 0n, '', null, undefined, NaN];
console.log('5a. all falsy?      ->', falsy.every((v) => !v)); // true
console.log('5b. [] is truthy    ->', Boolean([])); // true (surprises people)

// --- 6. ?? vs || : nullish coalescing --------------------------------------
// || returns the right side for ANY falsy left side — so 0 and '' get clobbered.
// ?? only falls through for null/undefined. Use ?? for defaults that allow 0/''.
const count = 0;
console.log('6a. count || 10 ->', count || 10); // 10  <- bug if 0 is valid!
console.log('6b. count ?? 10 ->', count ?? 10); // 0   <- correct default behavior

// --- 7. Optional chaining ---------------------------------------------------
const config = { db: { host: 'localhost' } };
console.log('7a. ?. present ->', config?.db?.host); // localhost
console.log('7b. ?. missing ->', config?.cache?.ttl); // undefined (no throw)

/**
 * INTERVIEW POINTS
 * - "== vs ===?" -> always === except the deliberate `x == null` null/undefined
 *   check. `==` coercion rules are a known footgun; linters ban it.
 * - "Why typeof null === 'object'?" -> historical bug kept for back-compat.
 *   Detect null with `x === null`, arrays with Array.isArray.
 * - "|| vs ???" -> ?? guards only null/undefined, so 0/''/false survive as
 *   valid values. The classic bug is `value || default` eating a legit 0.
 * - "List the falsy values." -> false, 0, -0, 0n, '', null, undefined, NaN.
 * - "Is NaN === NaN?" -> false; use Number.isNaN or Object.is.
 */
