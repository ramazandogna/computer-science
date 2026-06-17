/**
 * THE APP SHELL — nav + routed pages. Each <Route> maps a URL to a page.
 * react-router-dom does client-side routing (no full reload), the same model as
 * Vue Router in module 03.
 */
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext.jsx';

import HooksTour from './pages/HooksTour.jsx';
import UsersPage from './pages/UsersPage.jsx';
import React19Page from './pages/React19Page.jsx';
import './index.css';

export default function App() {
  const { theme } = useTheme();

  return (
    // data-theme drives the CSS variables in index.css. Toggling theme via the
    // context re-renders this and flips the attribute — a minimal theming setup.
    <div className="app" data-theme={theme}>
      <header className="app__header">
        <h1>React Interview Prep</h1>
        <nav>
          {/* NavLink adds an "active" class to the current route automatically. */}
          <NavLink to="/hooks">Hooks</NavLink>
          <NavLink to="/users">Users (fetch)</NavLink>
          <NavLink to="/react19">React 19</NavLink>
        </nav>
      </header>

      <main className="app__main">
        <Routes>
          <Route path="/" element={<Navigate to="/hooks" replace />} />
          <Route path="/hooks" element={<HooksTour />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/react19" element={<React19Page />} />
          <Route path="*" element={<p>404 — no such route.</p>} />
        </Routes>
      </main>
    </div>
  );
}
