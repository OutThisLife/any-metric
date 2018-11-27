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
  <Box display="flex" alignItems="center" height="100vh" width="100vw">
    <Main
      id="app"
      position="relative"
      width="calc(100% - var(--offset))"
      height="calc(100% - var(--offset))"
      overflow="hidden"
      margin="auto"
      borderRadius={10}
      background={theme.colours.panelBg}
      backgroundBlendMode="overlay">
      <Header />
      <Component {...pageProps} />
    </Main>
  </Box>
))

export interface LayoutProps extends Partial<AppProps> {
  pageProps: IObject
}
