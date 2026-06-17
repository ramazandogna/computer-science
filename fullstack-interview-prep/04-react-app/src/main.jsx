/**
 * THE BOOTSTRAP.
 *
 * createRoot is the React 18+ entry point (the old ReactDOM.render is removed in
 * React 19). It opts you into CONCURRENT rendering — React can interrupt,
 * pause, and resume rendering work, which is what powers Suspense, transitions,
 * and useDeferredValue.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  // StrictMode is a DEV-ONLY wrapper. It intentionally DOUBLE-INVOKES renders,
  // effects (mount → unmount → mount), and reducers to surface impure renders
  // and missing effect cleanup. If your effect breaks under StrictMode, your
  // effect has a bug (usually a missing cleanup). It renders nothing and is a
  // no-op in production. INTERVIEW: "why does my effect run twice?" -> this.
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
