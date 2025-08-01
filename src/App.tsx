import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from '@/pages/Home';
import Event from '@/pages/Event';
import LoginRedirect from '@/pages/LoginRedirect';
import ProfileSetup from '@/pages/ProfileSetup';
import ProfileEdit from '@/pages/ProfileEdit';
import MyPage from '@/pages/MyPage';
import AccountDeletion from '@/pages/AccountDeletion';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import PrivacyConsent from '@/pages/PrivacyConsent';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import { setupAxiosInterceptors } from '@/apis/responseInterceptor';
import Events from './pages/Events';
import GlobalErrorBoundary from './components/common/GlobalErrorBoundary';
import ErrorBoundary from './components/common/ErrorBoundary';
import { setScreenHeight } from './utils/viewport';
import DummyPanel from './components/common/DummyPanel';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  useEffect(() => {
    setScreenHeight();

    window.addEventListener('resize', setScreenHeight);
    return () => window.removeEventListener('resize', setScreenHeight);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/kakao',
      element: <LoginRedirect />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/privacy',
      element: <PrivacyPolicy />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/privacy-consent',
      element: <PrivacyConsent />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/terms',
      element: <TermsOfService />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/profile-setup',
      element: <ProfileSetup />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/events',
      element: <Events />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/event',
      element: <Event />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/setting',
      element: <MyPage />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/profile-edit',
      element: <ProfileEdit />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/account-deletion',
      element: <AccountDeletion />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <DummyPanel />
        <Toaster
          containerStyle={{
            bottom: '7rem',
          }}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
