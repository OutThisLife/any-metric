import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import Pod from '@/components/pod'
import { commerce, internet, lorem, seed } from 'faker'
import Grid, { Layout } from 'react-grid-layout'
import {
  compose,
  onlyUpdateForKeys,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  withHandlers,
  withStateHandlers
} from 'recompose'

import Controls from './controls'
import Home from './styled'

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
const data = [...Array(255).keys()].map(() => ({
  image: internet.avatar(),
  title: commerce.productName(),
  price: commerce.price(),
  copy: lorem.paragraph(),
  slug: lorem.slug()
}))

export default compose<TInner & TState & THandlers, {}>(
  setDisplayName('homepage'),
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
  <Home innerRef={onResize}>
    <Controls setter={onLayoutChange} />

    <Grid
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
    </Grid>
  </Home>
))
