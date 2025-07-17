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
import LayoutWithHeader from '@/components/common/LayoutWithHeader';
import { setupAxiosInterceptors } from '@/apis/responseInterceptor';

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
      path: '/profile-setup',
      element: <ProfileSetup />,
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
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
