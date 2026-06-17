/**
 * ============================================================================
 * ASYNC PATTERNS — promises, async/await, and concurrency primitives.
 * Run me:  node src/05-async-patterns.js   (or: pnpm async)
 * ============================================================================
 *
 * A Promise is a placeholder for a value that isn't ready yet. It is in one of
 * three states: pending -> fulfilled OR rejected. Once settled it never changes.
 * async/await is sugar over promises: `await p` pauses the async function until
 * `p` settles, WITHOUT blocking the thread (the event loop keeps running).
 */

// A tiny helper so the examples are deterministic and self-contained.
const delay = (ms, value, shouldReject = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldReject ? reject(new Error(value)) : resolve(value)), ms),
  );

async function main() {
  // --- 1. Sequential vs parallel: the #1 async perf mistake -----------------
  // SEQUENTIAL: each await waits for the previous. Total ≈ 100 + 100 + 100.
  // This is almost always WRONG when the calls are independent.
  console.time('1a-sequential');
  const a1 = await delay(100, 'a');
  const b1 = await delay(100, 'b');
  const c1 = await delay(100, 'c');
  console.timeEnd('1a-sequential'); // ~300ms
  console.log('   sequential result ->', [a1, b1, c1]);

  // PARALLEL: kick them off together, then await all. Total ≈ 100ms.
  // Promise.all rejects as soon as ANY promise rejects (fail-fast).
  console.time('1b-parallel');
  const [a2, b2, c2] = await Promise.all([delay(100, 'a'), delay(100, 'b'), delay(100, 'c')]);
  console.timeEnd('1b-parallel'); // ~100ms
  console.log('   parallel result ->', [a2, b2, c2]);

  // --- 2. The combinators (know all four) -----------------------------------
  // allSettled: NEVER rejects; returns {status, value|reason} per promise. Use
  // when you want every result regardless of individual failures (dashboards).
  const settled = await Promise.allSettled([
    delay(10, 'ok'),
    delay(10, 'boom', true), // rejects
  ]);
  console.log('2a. allSettled ->', settled.map((s) => s.status)); // ['fulfilled','rejected']

  // race: settles with the FIRST promise to settle (fulfill OR reject). Classic
  // use: timeouts ("whichever finishes first, the request or the 5s timer").
  const raced = await Promise.race([delay(50, 'slow'), delay(10, 'fast')]);
  console.log('2b. race ->', raced); // 'fast'

  // any: first FULFILLMENT; ignores rejections unless ALL reject (then
  // AggregateError). Use for "try N mirrors, take the first that works".
  const any = await Promise.any([delay(50, 'x', true), delay(10, 'y')]);
  console.log('2c. any ->', any); // 'y'

  // --- 3. Error handling: try/catch is the await-native way -----------------
  try {
    await delay(10, 'expected failure', true);
  } catch (err) {
    console.log('3. caught ->', err.message);
  }

  // --- 4. await-in-loop: intentional sequencing vs accidental slowness ------
  // GOTCHA: `for...of` with await runs ITEM BY ITEM (sequential). Correct when
  // order matters or you must rate-limit. For independent work, map -> all.
  const ids = [1, 2, 3];
  const parallelResults = await Promise.all(ids.map((id) => delay(20, `item-${id}`)));
  console.log('4. map + all (parallel) ->', parallelResults);

  // --- 5. AbortController: cancelling async work (modern, expected) ---------
  // fetch and many APIs accept a signal. This is how you cancel an in-flight
  // request when a component unmounts or a newer search supersedes it.
  const controller = new AbortController();
  const cancellable = new Promise((resolve, reject) => {
    const id = setTimeout(() => resolve('completed'), 100);
    controller.signal.addEventListener('abort', () => {
      clearTimeout(id);
      reject(new Error('aborted'));
    });
  });
  controller.abort(); // cancel before it finishes
  try {
    await cancellable;
  } catch (err) {
    console.log('5. abort ->', err.message); // aborted
  }
}

main().then(() => console.log('\nDONE.'));

/**
 * INTERVIEW POINTS
 * - "all vs allSettled vs race vs any?" -> all (fail-fast, all values),
 *   allSettled (never rejects, per-item status), race (first to settle either
 *   way), any (first fulfillment, ignores rejects unless all fail).
 * - "How do you parallelize independent awaits?" -> start the promises first,
 *   await Promise.all — don't await inside the loop unless you NEED sequencing.
 * - "Does await block the thread?" -> No. It suspends the async function and
 *   returns control to the event loop; other tasks run meanwhile.
 * - "What does an async function return?" -> always a Promise. `return x`
 *   resolves it; `throw` rejects it.
 * - "How do you cancel a fetch?" -> AbortController + pass signal; abort()
 *   rejects the promise with an AbortError.
 */
