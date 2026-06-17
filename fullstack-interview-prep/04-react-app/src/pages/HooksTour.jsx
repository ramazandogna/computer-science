/**
 * THE HOOKS TOUR — one interactive page demonstrating the core hooks with the
 * reasoning an interviewer wants. Read each section's comment, then play with
 * the UI. The two RULES OF HOOKS underpin everything:
 *   1. Only call hooks at the TOP LEVEL — never in conditions/loops/nested
 *      functions. React matches hook calls to state by CALL ORDER, so the order
 *      must be identical every render.
 *   2. Only call hooks from React functions (components or other hooks).
 */
import {
  useState,
  useReducer,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  useId,
  useTransition,
  useDeferredValue,
} from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function HooksTour() {
  return (
    <div className="stack">
      <h2>Hooks Tour</h2>
      <UseStateDemo />
      <UseReducerDemo />
      <UseRefDemo />
      <UseEffectDemo />
      <MemoCallbackDemo />
      <UseIdDemo />
      <ConcurrentDemo />
      <UseContextDemo />
    </div>
  );
}

/* ── useState ──────────────────────────────────────────────────────────────
   State that, when changed via the setter, triggers a re-render. */
function UseStateDemo() {
  const [count, setCount] = useState(0);

  function tripleIncrementWrong() {
    // BUG: setCount(count + 1) three times all read the SAME stale `count` from
    // this render's closure, so this only adds 1, not 3.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  function tripleIncrementRight() {
    // FIX: the UPDATER form receives the latest pending state. These compose,
    // so this correctly adds 3. Always use the updater when the new state
    // depends on the old. Classic interview catch.
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return (
    <section className="card2">
      <h3>useState — count: {count}</h3>
      <button onClick={tripleIncrementWrong}>+3 (stale, adds 1)</button>
      <button onClick={tripleIncrementRight}>+3 (updater, correct)</button>
      <button onClick={() => setCount(0)}>reset</button>
    </section>
  );
}

/* ── useReducer ────────────────────────────────────────────────────────────
   Prefer over useState when the next state depends on the previous in COMPLEX
   ways, or multiple values change together. Centralizes transitions in a pure
   reducer — easier to test and reason about than scattered setStates. */
function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, items: state.items + 1, total: state.total + action.price };
    case 'clear':
      return { items: 0, total: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
function UseReducerDemo() {
  const [cart, dispatch] = useReducer(cartReducer, { items: 0, total: 0 });
  return (
    <section className="card2">
      <h3>
        useReducer — {cart.items} items, ${cart.total}
      </h3>
      <button onClick={() => dispatch({ type: 'add', price: 10 })}>add $10</button>
      <button onClick={() => dispatch({ type: 'clear' })}>clear</button>
    </section>
  );
}

/* ── useRef ────────────────────────────────────────────────────────────────
   A mutable box whose .current persists across renders WITHOUT causing a
   re-render when changed. Two uses: (1) reference a DOM node, (2) hold a
   mutable value you don't want to render (timers, previous values). */
function UseRefDemo() {
  const inputRef = useRef(null); // DOM ref
  const renderCount = useRef(0); // mutable value that survives renders
  renderCount.current += 1; // mutating a ref does NOT trigger a re-render

  return (
    <section className="card2">
      <h3>useRef</h3>
      <input ref={inputRef} placeholder="focus me via the button" />
      <button onClick={() => inputRef.current?.focus()}>focus input</button>
      <p>
        <small>This section has rendered {renderCount.current} time(s).</small>
      </p>
    </section>
  );
}

/* ── useEffect vs useLayoutEffect ───────────────────────────────────────────
   useEffect runs AFTER paint (async, non-blocking) — default for data fetching,
   subscriptions, logging. useLayoutEffect runs BEFORE paint (sync) — only for
   reading layout / mutating the DOM to avoid a visible flicker. */
function UseEffectDemo() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Subscribe on mount, UNSUBSCRIBE in cleanup. A missing cleanup here would
    // leak a listener every mount (visible under StrictMode's double-invoke).
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []); // [] = subscribe once. The cleanup is the matching unsubscribe.

  useLayoutEffect(() => {
    // Runs synchronously before the browser paints. Use ONLY when you must
    // measure/mutate the DOM pre-paint; otherwise it blocks painting.
  }, []);

  return (
    <section className="card2">
      <h3>useEffect — window width: {width}px</h3>
      <small>Resize the window; the listener is cleaned up on unmount.</small>
    </section>
  );
}

/* ── useMemo & useCallback ──────────────────────────────────────────────────
   Both are caches keyed by a deps array. useMemo caches a VALUE (skip an
   expensive recompute); useCallback caches a FUNCTION identity (so a memoized
   child doesn't re-render). They are PERFORMANCE hints, not correctness tools —
   don't sprinkle them everywhere; profile first. The React Compiler aims to
   make most of these unnecessary. */
function MemoCallbackDemo() {
  const [n, setN] = useState(20);
  const [, force] = useState(0);

  // Without useMemo, this "expensive" computation reruns on EVERY render,
  // including the unrelated force-render below. With it, it reruns only when n
  // changes.
  const fib = useMemo(() => slowFib(n), [n]);

  // A stable callback identity (only changes if deps change). Useful when
  // passed to a React.memo child to preserve its bail-out.
  const handler = useCallback(() => setN((x) => x + 1), []);

  return (
    <section className="card2">
      <h3>
        useMemo — fib({n}) = {fib}
      </h3>
      <button onClick={handler}>n + 1</button>
      <button onClick={() => force((x) => x + 1)}>unrelated re-render</button>
      <small> (fib is NOT recomputed on the unrelated re-render)</small>
    </section>
  );
}
function slowFib(num) {
  return num <= 1 ? num : slowFib(num - 1) + slowFib(num - 2);
}

/* ── useId ──────────────────────────────────────────────────────────────────
   Generates a stable, unique id that matches between server and client render
   (important for SSR/hydration). Use it to wire <label htmlFor> to an input —
   NOT for list keys. */
function UseIdDemo() {
  const id = useId();
  return (
    <section className="card2">
      <h3>useId</h3>
      <label htmlFor={id}>Accessible label tied via useId</label>
      <input id={id} />
    </section>
  );
}

/* ── useTransition & useDeferredValue ───────────────────────────────────────
   Concurrent features that keep the UI responsive during heavy updates.
   useTransition marks a state update as non-urgent ("low priority"): React can
   interrupt it to handle urgent updates (typing) first, and gives you `isPending`.
   useDeferredValue does the same for a value you derive from. */
function ConcurrentDemo() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState([]);

  // The input update is URGENT (must feel instant). Building a big filtered list
  // is non-urgent, so we wrap it in startTransition — React keeps the input
  // responsive and shows isPending while the heavy work happens.
  function onChange(e) {
    const value = e.target.value;
    setQuery(value); // urgent: reflect the keystroke immediately
    startTransition(() => {
      // pretend this is expensive: build a 5000-row filtered list
      const big = Array.from({ length: 5000 }, (_, i) => `${value}-${i}`).filter((s) =>
        s.includes(value),
      );
      setList(big);
    });
  }

  // useDeferredValue is the value-based alternative; deferredQuery "lags" behind
  // query during heavy renders, letting the input stay snappy.
  const deferredQuery = useDeferredValue(query);

  return (
    <section className="card2">
      <h3>useTransition / useDeferredValue {isPending && '(updating…)'}</h3>
      <input value={query} onChange={onChange} placeholder="type fast…" />
      <small>
        {' '}
        rows: {list.length}, deferred query: "{deferredQuery}"
      </small>
    </section>
  );
}

/* ── useContext ─────────────────────────────────────────────────────────────
   Read a context value (here via our guarded useTheme wrapper). */
function UseContextDemo() {
  const { theme, toggle } = useTheme();
  return (
    <section className="card2">
      <h3>useContext — theme: {theme}</h3>
      <button onClick={toggle}>toggle theme</button>
    </section>
  );
}
