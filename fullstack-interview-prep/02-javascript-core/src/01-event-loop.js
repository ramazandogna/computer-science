/**
 * ============================================================================
 * THE EVENT LOOP — the single most-tested JS concept in senior interviews.
 * Run me:  node src/01-event-loop.js   (or: pnpm event-loop)
 * ============================================================================
 *
 * JS is single-threaded: ONE call stack, ONE thing running at a time. So how
 * does it do network calls, timers, and I/O without freezing? It doesn't do
 * them itself. The runtime (browser or Node) hands them to host APIs, and when
 * they finish, their callbacks are queued. The EVENT LOOP is the scheduler that
 * decides which queued callback runs next, and only ever when the call stack is
 * empty.
 *
 * Two queue tiers you MUST be able to order in your head:
 *
 *   MICROTASKS  — Promise callbacks (.then/.catch/.finally), queueMicrotask,
 *                 await continuations. DRAINED COMPLETELY after each task,
 *                 before any rendering or the next macrotask.
 *   MACROTASKS  — setTimeout/setInterval, setImmediate (Node), I/O callbacks,
 *                 message events. ONE is processed per loop turn.
 *
 * The rule that wins interviews:
 *   "After the currently running synchronous code finishes, the engine empties
 *    the ENTIRE microtask queue before it touches even a single macrotask."
 */

console.log('1: synchronous — runs first, top to bottom');

// MACROTASK: handed to the timer subsystem; its callback is queued for a future
// loop turn. 0ms does NOT mean "now" — it means "as soon as the stack is clear
// AND microtasks are drained AND it's this queue's turn".
setTimeout(() => console.log('5: setTimeout (macrotask)'), 0);

// MICROTASK: Promise.resolve() is already settled, so the .then callback is
// queued onto the microtask queue immediately.
Promise.resolve().then(() => console.log('3: promise.then (microtask)'));

// queueMicrotask schedules onto the SAME queue as promises, after the one above.
queueMicrotask(() => console.log('4: queueMicrotask (microtask)'));

console.log('2: synchronous — still part of the current task');

/**
 * Expected output:
 *   1: synchronous
 *   2: synchronous
 *   3: promise.then       <- microtasks drain before...
 *   4: queueMicrotask
 *   5: setTimeout         <- ...the first macrotask
 *
 * INTERVIEW TRAP: a microtask that schedules another microtask can STARVE the
 * macrotask queue forever (the loop won't advance until microtasks are empty).
 * That's why an infinite Promise-chain can hang a tab while setTimeout-based
 * recursion does not.
 */

// --- Demonstrate the drain-before-advance rule with nesting -------------------
setTimeout(() => {
  console.log('A: macrotask 1 starts');
  // This microtask is queued DURING a macrotask. It runs before macrotask 2,
  // because the loop drains microtasks between every macrotask.
  Promise.resolve().then(() => console.log('B: microtask queued inside macrotask 1'));
}, 0);

setTimeout(() => console.log('C: macrotask 2'), 0);

/**
 * Tail output (after the first block):
 *   A: macrotask 1 starts
 *   B: microtask queued inside macrotask 1
 *   C: macrotask 2
 *
 * NODE-SPECIFIC NUANCE (be ready for it): Node's loop has named PHASES
 * (timers → pending → poll → check → close). `setImmediate` fires in the
 * "check" phase, generally AFTER `setTimeout(0)`. Node also has TWO queues that
 * outrank the macrotask phases: the `process.nextTick` queue and the Promise
 * microtask queue — and the nextTick queue is normally drained BEFORE promises.
 *
 * GOTCHA (senior-level): "normally" depends on context. In a CommonJS file,
 * nextTick wins; but in an ES MODULE, the top-level body runs as a microtask
 * continuation of the module job, so a nextTick scheduled at module top-level
 * is deferred until AFTER the already-queued promise microtasks. This very file
 * is ESM, so don't rely on top-level nextTick ordering here — the takeaway is
 * "know that the surrounding execution context changes microtask timing", which
 * is exactly the kind of subtlety that separates a senior answer from a junior
 * one. The robust, portable rule is the macro/micro one stated at the top.
 */
