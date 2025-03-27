import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Event from './pages/Event';
import LoginRedirect from './pages/LoginRedirect';
import ProfileSetup from './pages/ProfileSetup';
import ProfileEdit from './pages/ProfileEdit';
import MyPage from './pages/MyPage';
import LayoutWithHeader from './components/common/LayoutWithHeader';

function App() {
  const queryClient = new QueryClient();

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
      path: '/',
      element: <LayoutWithHeader />,
      children: [
        {
          path: '/profile-setup',
          element: <ProfileSetup />,
        },
        {
          path: '/user/:userId',
          element: <MyPage />,
        },
        {
          path: '/profile-edit',
          element: <ProfileEdit />,
        },
      ],
    },
    {
      path: '/event',
      element: <Event />,
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
