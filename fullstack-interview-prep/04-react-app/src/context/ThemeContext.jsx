/**
 * CONTEXT — share state across the tree without "prop drilling".
 *
 * Use context for LOW-FREQUENCY, broadly-needed values (theme, current user,
 * locale). GOTCHA: every consumer re-renders when the context VALUE changes, so
 * don't put rapidly-changing state in one giant context — split contexts or use
 * a real store. That re-render behavior is the #1 context interview question.
 */
import { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // WHY useMemo here: the provider's `value` is an object. Without memoizing, a
  // new object identity is created every render, forcing ALL consumers to
  // re-render even when theme didn't change. Memoize the value object.
  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  // React 19: you can render <ThemeContext value={...}> directly. The old
  // <ThemeContext.Provider value={...}> still works but is no longer required.
  return <ThemeContext value={value}>{children}</ThemeContext>;
}

// A custom hook that both consumes the context AND guards misuse: if someone
// calls it outside the provider, fail loudly instead of returning null and
// crashing mysteriously three components later. This wrapper pattern is a
// senior habit worth showing in interviews.
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return ctx;
}
