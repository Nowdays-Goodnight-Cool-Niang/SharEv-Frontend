import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import mixpanel from 'mixpanel-browser';

const mixpanelToken = import.meta.env.VITE_MIXPANEL_TOKEN;
if (mixpanelToken) {
  mixpanel.init(mixpanelToken, {
    debug: import.meta.env.DEV, // 개발환경에서만 디버그 모드
    track_pageview: true,
    persistence: 'localStorage',
  });
}

// if (process.env.NODE_ENV === 'development') {
//   import('./mocks/browser').then(({ worker }) => {
//     worker.start();
//   });
// }

createRoot(document.getElementById('root')!).render(<App />);
