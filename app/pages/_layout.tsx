import Header from '@/components/Header'
import { BaphoTheme } from '@/theme'
import { AppProps } from 'next/app'
import { Box } from 'rebass'
import { compose, lifecycle, setDisplayName } from 'recompose'

import { Main } from './_app.styles'

export default compose<LayoutProps & BaphoTheme, LayoutProps>(
  setDisplayName('layout'),
  lifecycle({
    componentDidMount() {
      document.addEventListener('keydown', e => {
        console.log(e.which)
        if (e.which !== 9) {
          return
        }

        e.preventDefault()

        const $active = document.activeElement
        ;[].slice
          .call(document.querySelectorAll('input'))
          .find((el: HTMLElement) => el !== $active)
          .focus()
      })
    }
  })
)(({ Component }) => (
  <Main>
    <Header />

    <Box as="main">
      <Component />
    </Box>
  </Main>
))

export type LayoutProps = Partial<AppProps>
