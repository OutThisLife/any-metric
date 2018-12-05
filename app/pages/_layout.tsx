import Header from '@/components/Header'
import { BaphoTheme } from '@/theme'
import { AppProps } from 'next/app'
import { MeasuredComponentProps, withContentRect } from 'react-measure'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Main } from './_app.styles'

export default compose<LayoutProps & BaphoTheme, LayoutProps>(
  setDisplayName('layout'),
  withContentRect('bounds')
)(({ Component, measureRef, contentRect }) => (
  <Main>
    <Header />

    <Box as="main">
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

export type LayoutProps = Partial<AppProps> & Partial<MeasuredComponentProps>
