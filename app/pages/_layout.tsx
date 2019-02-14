import { BaphoTheme } from '@/theme'
import { AppProps } from 'next/app'
import { compose, lifecycle, setDisplayName } from 'recompose'

export default compose<LayoutProps & BaphoTheme, LayoutProps>(
  setDisplayName('layout'),
  lifecycle({
    componentDidMount() {
      ;[].slice
        .call(document.querySelectorAll('[tabindex]'))
        .forEach((el: HTMLElement) => el.setAttribute('tabindex', '-1'))

      document.addEventListener(
        'mousemove',
        ({ clientX, clientY, pageX, pageY }) =>
          Object.defineProperty(window, 'mouse', {
            enumerable: true,
            writable: true,
            value: { x: clientX, y: clientY, px: pageX, py: pageY }
          })
      )
    }
  })
)(({ Component }) => <Component />)

export type LayoutProps = Partial<AppProps>
