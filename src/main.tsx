import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Ensure page starts at top
if (typeof window !== 'undefined') {
  window.scrollTo(0, 0);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
