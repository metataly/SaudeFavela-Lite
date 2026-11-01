import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initServiceWorker } from './services/pwaService';

// Inicializa registro do Service Worker com suporte offline
initServiceWorker().catch((err) => {
  console.info('[PWA] Inicialização assíncrona do Service Worker:', err);
});

createRoot(document.getElementById('root')!).render(<App />);
