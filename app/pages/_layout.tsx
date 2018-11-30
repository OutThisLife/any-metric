import Box from '@/components/Box'
import Header from '@/components/Header'
import { BaphoTheme } from '@/theme'
import { AppProps } from 'next/app'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { compose, setDisplayName } from 'recompose'

import { Main } from './_app.styles'

export default compose<
  BaphoTheme & LayoutProps & MeasuredComponentProps,
  LayoutProps
>(
  withContentRect('bounds'),
  setDisplayName('layout')
)(({ Component, measureRef, contentRect }) => (
  <Main>
    <Box
      id="app"
      display="grid"
      gridTemplate="'head' 'main'"
      gridTemplateRows="min-content 1fr"
      gridGap="calc(var(--offset) / 2)">
      <Header />

      <div ref={measureRef} style={{ gridArea: 'main', gridGap: 'inherit' }}>
        <Component {...contentRect.bounds} />
      </div>
    </Box>
  </Main>
))

export type LayoutProps = Partial<AppProps>
