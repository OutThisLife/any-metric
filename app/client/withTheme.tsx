import { getTheme } from '@/lib/queries'
import { BaphoTheme } from '@/theme'
import { compose } from 'recompose'
import { ThemeProvider } from 'styled-components'

export default compose<WithThemeProps & BaphoTheme, WithThemeProps>(getTheme())(
  ({ children, theme }) => (
    <ThemeProvider theme={theme}>{children({ theme })}</ThemeProvider>
  )
)

export interface WithThemeProps {
  children: (a: BaphoTheme) => JSX.Element
}
