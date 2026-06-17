import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @vitejs/plugin-react gives you JSX transform + Fast Refresh (React's HMR that
// preserves component state on edit). In a larger app you'd add the React
// Compiler here as a Babel plugin (babel-plugin-react-compiler) to get
// automatic memoization — see the React 19 page for what that replaces.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
});
