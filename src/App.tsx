import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Event from './pages/Event';
import LoginRedirect from './pages/LoginRedirect';
import ProfileSetup from './pages/ProfileSetup';

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
      path: '/profile-setup',
      element: <ProfileSetup />,
    },
    {
      path: '/event',
      element: <Event />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
