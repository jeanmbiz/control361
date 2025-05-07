import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/404'
import { AppLayout } from './pages/_layouts/app'
import { Dashboard } from './pages/app/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Dashboard/> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
