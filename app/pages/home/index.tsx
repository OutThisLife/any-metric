import Pod from '@/components/pod'
import { getFakeData, getLayout } from '@/lib/queries'
import Home from '@/pages/home/style'
import { Layout } from '@/server/schema/queries/layout'
import { FakeData } from '@/server/schema/types'
import { MutationFunc } from 'react-apollo'
import Grid from 'react-grid-layout'
import { compose, setDisplayName, StateHandler, StateHandlerMap, withHandlers, withState } from 'recompose'

interface TInner {
  mutate: MutationFunc<{ layout: ReactGridLayout.Layout[] }>
  layoutData: { layout: Layout }
  fakeData: { fake: FakeData[] }
}

interface TState {
  dims: {
    width: number
    height: number
  }
}

interface TStateHandles extends StateHandlerMap<TState> {
  setDimensions: StateHandler<TState>
}

interface THandles {
  onResize: (ref?: HTMLElement | ReactGridLayout.Layout[]) => void
  onLayoutChange: (layout: ReactGridLayout.Layout[]) => void
}

export default compose<TInner & TState & TStateHandles & THandles, {}>(
  setDisplayName('homepage'),
  getFakeData(),
  getLayout(),
  withState('dims', 'setDimensions', {
    width: 1024,
    height: 768
  }),
  withHandlers<TInner & TStateHandles, THandles>(() => ({
    onResize: ({ setDimensions }) => ref => {
      const handle = () =>
        window.requestAnimationFrame(() =>
          setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
          })
        )

      if (ref instanceof HTMLElement) {
        window.addEventListener('resize', handle)
      }

      handle()
    },

    onLayoutChange: ({ mutate }) => layout => mutate({ variables: { layout: JSON.stringify(layout) } })
  }))
)(({ onResize, onLayoutChange, fakeData: { fake }, layoutData: { layout }, dims: { width, height } }) => (
  <Home innerRef={onResize}>
    <Grid
      width={width}
      rowHeight={height / layout.cols}
      layout={layout.data}
      cols={layout.cols}
      onLayoutChange={onLayoutChange}
      onResize={onResize}
      margin={[35, 35]}
      draggableHandle=".drag-h"
      useCSSTransforms={typeof window !== 'undefined'}
      compactType={null}>
      {layout.data.map(l => (
        <Pod key={l.i} name="UCAD Social" data={fake} data-grid={l} />
      ))}
    </Grid>
  </Home>
))
