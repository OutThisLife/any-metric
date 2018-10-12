import { getFakeStocks } from '@/lib/queries'
import { FakeCrawlResult, FakeStockResult } from '@/server/schema/types'
import omit from 'lodash/omit'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { compose, setDisplayName, shouldUpdate, withState } from 'recompose'

import Stats from './stats'
import Pod from './style'
import DataTable from './table'
import Title from './title'

interface TOutter {
  name: string
  children?: React.ReactNode
  data: FakeCrawlResult[]
  className?: string
}

interface TInner {
  isOpen: boolean
  open: (b: boolean) => void
  parentProps: Partial<TOutter>
  stockData: { fakeStock: FakeStockResult[] }
}

export default compose<TInner & TOutter, TOutter>(
  setDisplayName('pod'),
  getFakeStocks(),
  withState('isOpen', 'open', false)
)(({ children, ...props }) => (
  <Pod {...omit(props, ['isOpen', 'open', 'data'])}>
    {children}
    <Inner {...props} />
  </Pod>
))

const Inner = compose<TInner & TOutter, {}>(
  shouldUpdate<TOutter & TInner>(
    (props, nextProps) =>
      nextProps.open !== props.open ||
      !/(resizing|dragging)/.test(nextProps.className)
  )
)(({ open, isOpen, name, data, stockData: { fakeStock: stats }, ...props }) => (
  <div>
    <Title
      title={name}
      services={[IoLogoReddit, IoLogoTwitter]}
      onClick={() => open(!isOpen)}
      grid={props['data-grid']}
    />

    <DataTable data={data} />

    {isOpen && <Stats data={stats} />}
  </div>
))
