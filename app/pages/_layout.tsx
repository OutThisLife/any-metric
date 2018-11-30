import Box from '@/components/Box'
import Header from '@/components/Header'
import { BaphoTheme } from '@/theme'
import { AppProps } from 'next/app'
import { compose, setDisplayName } from 'recompose'

import { Main } from './_app.styles'

export default compose<BaphoTheme & LayoutProps, LayoutProps>(
  setDisplayName('layout')
)(({ Component }) => (
  <Main>
    <Box
      id="app"
      display="grid"
      gridTemplate="'head' 'main'"
      gridTemplateRows="min-content 1fr"
      gridGap="calc(var(--offset) / 2)">
      <Header />
      <Component />
    </Box>
  </Main>
))

export type LayoutProps = Partial<AppProps>
