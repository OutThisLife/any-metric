import { ThemeProvider } from 'styled-components'

import theme from '../theme'

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children({ theme })}</ThemeProvider>
)
