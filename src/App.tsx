import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <ThemeProvider storageKey="control361-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | Control 361º" />
      </HelmetProvider>
    </ThemeProvider>
  )
}
