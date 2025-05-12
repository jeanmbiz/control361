import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet'
import { QueryClientProvider } from '@tanstack/react-query'
import { APIProvider } from '@vis.gl/react-google-maps'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider'
import { env } from './env'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <div className="main-container">
      <ThemeProvider storageKey="control361-theme" defaultTheme="dark">
        <HelmetProvider>
          <Helmet titleTemplate="%s | Control 361º" />
          <APIProvider apiKey={env.VITE_GOOGLE_MAPS_API_KEY}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </APIProvider>
        </HelmetProvider>
      </ThemeProvider>
    </div>
  )
}
