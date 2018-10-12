import Pod from '@/components/pod'
import { getFakeCrawl } from '@/lib/queries'
import withDimensions, { DimProps } from '@/lib/withDimensions'
import withLayout, { LayoutProps } from '@/lib/withLayout'
import { FakeCrawlResult } from '@/server/schema/types'
import Grid, { Layout } from 'react-grid-layout'
import { branch, compose, renderComponent, setDisplayName } from 'recompose'

import Home from './style'

interface TInner {
  resultData: { fakeCrawl: FakeCrawlResult[] }
  layoutData: { layout: Layout[] }
}

export default compose<TInner & DimProps & LayoutProps, {}>(
  setDisplayName('homepage'),
  withLayout(),
  getFakeCrawl(),
  branch<TInner>(
    ({ resultData, layoutData }) => resultData.loading ^ layoutData.loading,
    renderComponent(() => null)
  ),
  withDimensions(true)
)(
  ({
    onRef,
    changeLayout,
    resultData: { fakeCrawl: data },
    layoutData: { layout },
    width,
    height
  }) => (
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
          <Pod key={l.i} name="UCAD Social" data={data} data-grid={l} />
        ))}
      </Grid>
    </Home>
  )
)
