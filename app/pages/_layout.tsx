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
  <Main
    display="grid"
    gridTemplate="'head' 'main'"
    gridTemplateRows="min-content 1fr"
    alignItems="flex-start"
    justifyContent="center"
    width="100vw"
    minHeight="100vh"
    padding="var(--offset)"
    paddingTop="calc(var(--offset) / 2)">
    <Header />

    <Box id="app" gridArea="main" paddingY="var(--offset)">
      <div
        ref={measureRef}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          height: '100%',
          gridGap: 'calc(var(--offset) / 2)'
        }}>
        <Component {...contentRect.bounds} />
      </div>
    </Box>
  </Main>
))

export type LayoutProps = Partial<AppProps>
