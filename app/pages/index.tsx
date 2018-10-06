import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Pod from '@/components/pod'
import { commerce, internet, lorem, seed } from 'faker'
import { rgba } from 'polished'
import Grid, { Layout, ReactGridLayoutProps } from 'react-grid-layout'
import { compose, onlyUpdateForKeys, StateHandler, StateHandlerMap, withHandlers, withStateHandlers } from 'recompose'
import styled, { css, StyledComponentClass } from 'styled-components'

interface TState {
  width: number
  height: number
  cols?: number
  layout?: Layout[]
}

interface THandlers extends StateHandlerMap<TState> {
  setDimensions: StateHandler<TState>
  setLayout: StateHandler<TState>
}

interface TInner {
  onLayoutChange: (layout: Layout[]) => void
  onResize: () => void
}

seed(100)
const data = [...Array(255).keys()].map(i => ({
  image: internet.avatar(),
  title: commerce.productName(),
  price: commerce.price(),
  copy: lorem.paragraph(),
  slug: lorem.slug()
}))

export default compose<TInner & TState & THandlers, {}>(
  withStateHandlers<TState, THandlers>(
    ({ cols = 40 }: any) => ({
      cols,
      width: 1024,
      height: 768,
      layout: (() => {
        if (typeof document !== 'undefined' && localStorage.getItem('BAPH_LAYOUT')) {
          return JSON.parse(localStorage.getItem('BAPH_LAYOUT'))
        }

        return [
          { i: 'a', x: cols / 4, y: 0, w: cols / 2, h: cols / 3.5, maxH: cols },
          { i: 'b', x: cols / 4, y: 1, w: cols / 2, h: cols / 3.5, maxH: cols }
        ]
      })()
    }),
    {
      setDimensions: () => (width, height) => ({ width, height }),
      setLayout: () => layout => localStorage.setItem('BAPH_LAYOUT', JSON.stringify(layout)) || { layout }
    }
  ),
  withHandlers<THandlers, TInner>(() => ({
    onResize: ({ setDimensions }) => () =>
      window.requestAnimationFrame(() => setDimensions(window.innerWidth, window.innerHeight)),

    onLayoutChange: ({ setLayout }) => setLayout
  })),
  onlyUpdateForKeys(['width', 'height', 'layout'])
)(({ onResize, onLayoutChange, cols, width, height, layout }) => (
  <Home
    innerRef={onResize}
    layout={layout}
    width={width}
    rowHeight={height / cols}
    cols={cols}
    onLayoutChange={onLayoutChange}
    onResize={onResize}
    margin={[35, 35]}
    draggableHandle=".drag-h"
    compactType={null}>
    <Pod key="a" name="UCAD Social" data={data} />
    <Pod key="b" name="DataMan 8050" data={data} />
  </Home>
))

const Home = styled<ReactGridLayoutProps>(Grid)`
  ${({ theme }) => css`
    width: 100vw;
    min-height: 100%;
    overflow-y: auto;

    .react-grid-item {
      &.react-grid-placeholder {
        outline: 1px ${rgba(theme.colours.base, 0.7)};
        background: ${rgba(theme.colours.secondary, 0.1)};
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
` as StyledComponentClass<{}, {}, ReactGridLayoutProps>
