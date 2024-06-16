import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Sidebar from './components/layouts/sidebar'
import { UploadScreen } from './screens/upload-screen'
import { ClientsScreen } from './screens/clients-screen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./lib/envs"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      { index: true, element: <Navigate to="/charge" replace /> },
      {
        index: true,
        path: "/charge",
        element: <UploadScreen />,
      },
      {
        path: "/clients",
        element: <ClientsScreen />,
      },
    ],
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
