import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Pod from '@/components/pod'
import { commerce, internet, lorem, seed } from 'faker'
import { rgba } from 'polished'
import { Responsive as Grid, ResponsiveProps, WidthProvider } from 'react-grid-layout'
import styled from 'styled-components'




seed(100)
const data = [...Array(255).keys()].map(i => ({
  image: internet.avatar(),
  title: commerce.productName(),
  status: i < 2 ? 'unread' : 'read',
  price: commerce.price(),
  copy: lorem.paragraph(),
  slug: lorem.slug()
}))

export default () => (
  <Home
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
    margin={[35, 35]}
    rowHeight={30}
    layouts={{
      lg: [{ i: 'a', x: 0, y: 0, w: 1, h: 2 }, { i: 'b', x: 2, y: 0, w: 1, h: 2 }]
    }}>
    <Pod key="a" data={data} />
    <Pod key="b" data={data} />
  </Home>
)

const Home = styled<ResponsiveProps>(WidthProvider(Grid))`
  width: 100vw;
  height: 100% !important;
  overflow-y: auto;

  .react-grid-item {
    &.react-grid-placeholder {
      outline: 2px dashed ${({ theme }) => rgba(theme.colours.base, 0.7)};
      background: none;
    }

    &.resizing,
    &.react-draggable-dragging {
      opacity: 0.9;
    }

    &.react-draggable-dragging {
      cursor: -webkit-grabbing;
    }
  }
`
