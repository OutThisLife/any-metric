import Pod from '@/components/pod'
import withDimensions, { DimProps } from '@/lib/withDimensions'
import withLayout, { LayoutProps } from '@/lib/withLayout'
import { FakeCrawlResult } from '@/server/schema/types'
import { DataValue } from 'react-apollo'
import Grid, { Layout } from 'react-grid-layout'
import { compose, setDisplayName } from 'recompose'

import Home from './style'

interface TInner {
  resultData: DataValue<{ fakeCrawl: FakeCrawlResult[] }>
  layoutData: DataValue<{ layout: Layout[] }>
}

export default compose<TInner & DimProps & LayoutProps, {}>(
  setDisplayName('homepage'),
  withLayout(),
  withDimensions(true)
)(({ onRef, changeLayout, layoutData: { layout }, width, height }) => (
  <Home innerRef={onRef}>
    <Grid
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
        <Pod key={l.i} name="UCAD Social" data-grid={l} />
      ))}
    </Grid>
  </Home>
))
