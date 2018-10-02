import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Pod from '@/components/pod'
import { commerce, internet, lorem, seed } from 'faker'
import { rgba } from 'polished'
import { Responsive as Grid, ResponsiveProps, WidthProvider } from 'react-grid-layout'
import styled, { css } from 'styled-components'

seed(100)
const data = [...Array(255).keys()].map(i => ({
  image: internet.avatar(),
  title: commerce.productName(),
  price: commerce.price(),
  copy: lorem.paragraph(),
  slug: lorem.slug()
}))

export default () => (
  <Home
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
    layouts={{
      lg: [{ i: 'a', x: 0, y: 0, w: 2, h: 1 }, { i: 'b', x: 2, y: 0, w: 2, h: 1 }]
    }}
    margin={[35, 35]}
    rowHeight={typeof window === 'undefined' ? 500 : window.innerHeight / 2}>
    <Pod key="a" name="UCAD Social" data={data} />
    <Pod key="b" name="DataMan 8050" data={data} />
  </Home>
)

const Home = styled<ResponsiveProps>(WidthProvider(Grid))`
  ${({ theme }) => css`
    width: 100vw;
    height: 100% !important;
    overflow-y: auto;

    .react-grid-item {
      &.react-grid-placeholder {
        outline: 2px dashed ${rgba(theme.colours.base, 0.7)};
        background: none;
      }

      &.resizing,
      &.react-draggable-dragging {
        opacity: 0.9;

        > * {
          pointer-events: none;
        }
      }

      &.react-draggable-dragging {
        cursor: -webkit-grabbing;
      }
    }

    .react-resizable-handle {
      z-index: 10;
    }
  `};
`
