import Box from '@/components/Box'
import Header from '@/components/Header'
import { BaphoTheme } from '@/theme'
import { AppProps } from 'next/app'
import { compose, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'
import { IObject } from 'typings'

import { Main } from './_app.styles'

export default compose<BaphoTheme & LayoutProps, LayoutProps>(
  withTheme,
  setDisplayName('layout')
)(({ theme, Component, pageProps }) => (
  <Main>
    <Box
      id="app"
      position="relative"
      margin="auto"
      borderRadius={10}
      background={theme.colours.panelBg}
      backgroundBlendMode="overlay">
      <Header />
      <Component {...pageProps} />
    </Box>
  </Main>
))

export interface LayoutProps extends Partial<AppProps> {
  pageProps: IObject
}
