import Header from '@/components/Header'
import { BaphoTheme } from '@/theme'
import { AppProps } from 'next/app'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Main } from './_app.styles'

export default compose<LayoutProps & BaphoTheme, LayoutProps>(
  setDisplayName('layout')
)(({ Component }) => (
  <Main>
    <Header />

    <Box as="main">
      <Component />
    </Box>
  </Main>
))

export type LayoutProps = Partial<AppProps>
