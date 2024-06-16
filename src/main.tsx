import "./lib/envs"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './components/layouts/sidebar'
import { UploadScreen } from './screens/upload-screen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChargedTable } from './screens/clients-screen/table'
import { ClientsScreen } from './screens/clients-screen'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
        children: [
          { index: true, element: <Navigate to="1" replace /> },
          {
            path: ":page",
            element: <ChargedTable />,
          }
        ]
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
