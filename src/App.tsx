import { Helmet, HelmetProvider } from "@dr.pogodin/react-helmet";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Control 361º" />
    </HelmetProvider>
  )
}