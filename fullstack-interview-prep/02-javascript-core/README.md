# 02 — JavaScript Core

Six runnable deep-dives into the language fundamentals that separate "writes
React" from "understands JavaScript". No framework, no build step — pure ES
modules you run with Node and read line by line.

## Run it

```bash
cd 02-javascript-core
node src/01-event-loop.js     # or: pnpm event-loop
pnpm all                      # run every file in order
```

> No dependencies to install. `"type": "module"` in `package.json` makes each
> file an ES module, so `import`/`export` and top-level `await` work natively.

## Read in this order

| File | Topic | The interview hook |
|------|-------|--------------------|
| [`src/01-event-loop.js`](./src/01-event-loop.js) | Event loop, micro vs macro tasks | "What logs first, `setTimeout(0)` or `Promise.resolve().then`?" |
| [`src/02-closures-scope.js`](./src/02-closures-scope.js) | Closures, `var`/`let`, hoisting, TDZ | "Why does the `var` loop log `[3,3,3]`?" |
| [`src/03-this-binding.js`](./src/03-this-binding.js) | `this`, arrows, call/apply/bind | "How is `this` resolved?" |
| [`src/04-prototypes-classes.js`](./src/04-prototypes-classes.js) | Prototype chain, `class` sugar, `#private` | "Is JS class-based?" |
| [`src/05-async-patterns.js`](./src/05-async-patterns.js) | Promises, async/await, combinators, AbortController | "all vs allSettled vs race vs any?" |
| [`src/06-types-coercion-equality.js`](./src/06-types-coercion-equality.js) | Primitives, `==` vs `===`, `??`, truthiness | "List the 8 falsy values." |

## The one mental model to internalize first

The event loop file is the spine. Almost every async bug, every "why didn't my
state update yet", every "why does this fire out of order" traces back to:

> **Synchronous code → drain ALL microtasks → ONE macrotask → drain ALL
> microtasks → next macrotask → …**

Get this cold and the rest of async JS stops being magic.

---

## Interview drills

**Q1. Predict the output:**
```js
console.log('a');
setTimeout(() => console.log('b'), 0);
Promise.resolve().then(() => console.log('c'));
console.log('d');
```
Answer: `a d c b`. Sync first (`a`, `d`), then the microtask (`c`) drains before
the macrotask (`b`).

**Q2. Why does this log `[3, 3, 3]` and how do you fix it?**
```js
const fns = [];
for (var i = 0; i < 3; i++) fns.push(() => i);
console.log(fns.map((f) => f()));
```
Answer: `var` is function-scoped — one shared binding, captured by all three
closures; by call time it's `3`. Fix: `let` (fresh per-iteration binding).

**Q3. What's the difference between these?**
```js
const obj = { name: 'A', greet() { return this.name; }, greet2: () => this.name };
```
Answer: `greet` is a method — `this` is the receiver (`obj`). `greet2` is an
arrow — no own `this`, captures the enclosing (module) scope, so `this.name` is
undefined. Never use arrows for object methods.

**Q4. `0 || 'default'` vs `0 ?? 'default'`?**
Answer: `||` returns `'default'` for any falsy left operand (so a valid `0`/`''`
gets clobbered). `??` only falls through for `null`/`undefined`. Use `??` for
defaults where `0`/`''`/`false` are legitimate values.

**Q5. Make three independent API calls as fast as possible.**
Answer: start them all, then `await Promise.all([...])` — not three sequential
`await`s. If you need every result even when some fail, use `Promise.allSettled`.

**Q6. Implement `debounce(fn, wait)` from scratch.**
```js
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
```
Talk through: closure over `timer`, why `apply(this, args)` preserves the
caller's `this`/arguments, and debounce (fire after quiet period) vs throttle
(fire at most once per interval). This is the most common JS coding task.

**Q7. Deep-clone an object — what are the trade-offs?**
Answer: `structuredClone(obj)` (modern, handles cycles/Dates/Maps, no
functions); `JSON.parse(JSON.stringify(obj))` (fast but drops functions/undefined,
breaks Dates, fails on cycles); a manual recursive clone (full control, more
code). Shallow `{...obj}` only copies one level.

### Coding tasks
1. Implement `throttle(fn, limit)` and explain when you'd pick it over debounce.
2. Implement `Promise.all` yourself (resolve with an array preserving order;
   reject on first rejection).
3. Write a `once(fn)` that runs `fn` at most once and caches its result.
