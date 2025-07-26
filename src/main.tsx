import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import mixpanel from 'mixpanel-browser';
import * as Sentry from '@sentry/react';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
Sentry.init({
  dsn: sentryDsn,
  sendDefaultPii: true,
  environment: import.meta.env.MODE,
  sampleRate: import.meta.env.DEV ? 0.1 : 1.0,
});

const mixpanelToken = import.meta.env.VITE_MIXPANEL_TOKEN;
if (mixpanelToken) {
  mixpanel.init(mixpanelToken, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
  });
}

async function enableMocking() {
  if (import.meta.env.VITE_MOCKING === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'warn',
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});
