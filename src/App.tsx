import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Home from './pages/Home';
import Form from './pages/Form';
import Event from './pages/Event';
import EventDetail from './pages/EventDetail';

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/account',
      element: <Form />,
    },
    {
      path: '/events',
      element: <Event />,
    },
    {
      path: '/event/:eventId',
      element: <EventDetail />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
