import Pod from '@/components/pod'
import { getFakeData, getLayout } from '@/lib/queries'
import Home from '@/pages/home/style'
import { Layout } from '@/server/schema/queries/layout'
import { FakeData } from '@/server/schema/types'
import { MutationFunc } from 'react-apollo'
import Grid from 'react-grid-layout'
import { compose, setDisplayName, StateHandler, StateHandlerMap, withHandlers, withStateHandlers } from 'recompose'


interface TInner {
  mutate: MutationFunc<{ layout: ReactGridLayout.Layout[] }>
  layoutData: { layout: Layout }
  fakeData: { fake: FakeData[] }
}

interface TState {
  width: number
  height: number
}

interface TStateHandles extends StateHandlerMap<TState> {
  setDimensions: StateHandler<TState>
}

interface THandles {
  onResize: () => void
  onLayoutChange: (layout: ReactGridLayout.Layout[]) => void
}

export default compose<TInner & TState & TStateHandles & THandles, {}>(
  setDisplayName('homepage'),
  getFakeData(),
  getLayout(),
  withStateHandlers<TState, TStateHandles, TInner>(
    ({ layoutData: { layout } }) => ({
      cols: layout.cols,
      layout: layout.data,
      width: 1024,
      height: 768
    }),
    {
      setDimensions: () => (width, height) => ({ width, height })
    }
  ),
  withHandlers<TInner & TStateHandles, THandles>(() => ({
    onResize: ({ setDimensions }) => () =>
      window.requestAnimationFrame(() => setDimensions(window.innerWidth, window.innerHeight)),

    onLayoutChange: ({ mutate }) => layout => mutate({ variables: { layout: JSON.stringify(layout) } })
  }))
)(({ onResize, onLayoutChange, fakeData, layoutData, width, height }) => (
  <Home innerRef={onResize}>
    <Grid
      width={width}
      rowHeight={height / layoutData.layout.cols}
      cols={layoutData.layout.cols}
      layout={layoutData.layout.data}
      onLayoutChange={onLayoutChange}
      onResize={onResize}
      margin={[35, 35]}
      draggableHandle=".drag-h"
      useCSSTransforms={typeof window !== 'undefined'}
      compactType={null}>
      <Pod key="a" name="UCAD Social" data={fakeData.fake} />
      <Pod key="b" name="DataMan 8050" data={fakeData.fake} />
    </Grid>
  </Home>
))
