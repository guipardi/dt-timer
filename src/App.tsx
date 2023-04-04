import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./styles/styles"
import { defaultTheme } from "./styles/themes/DefaultTheme"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello World</h1>

      <GlobalStyle />
    </ThemeProvider>
  )
}
