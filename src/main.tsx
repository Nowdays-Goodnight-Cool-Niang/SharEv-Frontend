import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// if (process.env.NODE_ENV === 'development') {
//   import('./mocks/browser').then(({ worker }) => {
//     worker.start();
//   });
// }

createRoot(document.getElementById('root')!).render(<App />);
