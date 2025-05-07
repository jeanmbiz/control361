import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet'
import { ThemeProvider } from './components/theme/theme-provider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider storageKey="control361-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | Control 361º" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  )
}
