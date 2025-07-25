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
import { setupAxiosInterceptors } from '@/apis/responseInterceptor';
import Events from './pages/Events';
import DummyPanel from './components/common/DummyPanel';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/kakao',
      element: <LoginRedirect />,
    },
    {
      path: '/privacy',
      element: <PrivacyPolicy />,
    },
    {
      path: '/privacy-consent',
      element: <PrivacyConsent />,
    },
    {
      path: '/terms',
      element: <TermsOfService />,
    },
    {
      path: '/profile-setup',
      element: <ProfileSetup />,
    },
    {
      path: '/events',
      element: <Events />,
    },
    {
      path: '/event',
      element: <Event />,
    },
    {
      path: '/setting',
      element: <MyPage />,
    },
    {
      path: '/profile-edit',
      element: <ProfileEdit />,
    },
    {
      path: '/account-deletion',
      element: <AccountDeletion />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <DummyPanel /> */}
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
