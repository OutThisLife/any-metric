import Pod from '@/components/pod'
import { getFakeCrawl } from '@/lib/queries'
import withDimensions, { DimProps } from '@/lib/withDimensions'
import withLayout, { LayoutProps } from '@/lib/withLayout'
import Home from '@/pages/home/style'
import { FakeCrawlResult } from '@/server/schema/types'
import Grid from 'react-grid-layout'
import { compose, setDisplayName } from 'recompose'

interface TInner {
  resultData: { fakeResult: FakeCrawlResult[] }
}

export default compose<TInner & DimProps & LayoutProps, {}>(
  setDisplayName('homepage'),
  getFakeCrawl(),
  withLayout(),
  withDimensions(true)
)(({ onRef, changeLayout, resultData: { fakeResult: data }, layoutData: { layout }, width, height }) => (
  <Home key="home" innerRef={onRef}>
    <Grid
      key="home-grid"
      width={width}
      rowHeight={height / layout.cols}
      layout={layout.data}
      cols={layout.cols}
      onLayoutChange={changeLayout}
      onResize={changeLayout}
      margin={[35, 35]}
      draggableHandle=".drag-h"
      useCSSTransforms={typeof window !== 'undefined'}
      compactType={null}>
      {layout.data.map(l => (
        <Pod key={l.i} name="UCAD Social" data={data} data-grid={l} />
      ))}
    </Grid>
  </Home>
))
