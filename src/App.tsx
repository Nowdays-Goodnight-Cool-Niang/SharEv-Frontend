import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import ProfileSetup from './pages/ProfileSetup';
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
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
