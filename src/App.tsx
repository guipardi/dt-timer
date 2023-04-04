import { ThemeProvider } from "styled-components"
import { Transactions } from "./pages/Transactions"
import { GlobalStyle } from "./styles/styles"
import { defaultTheme } from "./styles/themes/DefaultTheme"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Transactions />

      <GlobalStyle />
    </ThemeProvider>
  )
}
