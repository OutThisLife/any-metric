import { getFakeCrawl } from '@/lib/queries'
import { FakeCrawlResult } from '@/server/schema/types'
import omit from 'lodash/omit'
import { DataValue } from 'react-apollo'
import { compose, setDisplayName } from 'recompose'

import Inner from './inner'
import Pod from './style'

interface TOutter {
  name: string
  children?: React.ReactNode
  className?: string
}

export interface TInner extends TOutter {
  resultData: DataValue<{ fakeCrawl: FakeCrawlResult[] }>
}

export default compose<TInner, TOutter>(
  setDisplayName('pod'),
  getFakeCrawl()
)(({ children, ...props }) => (
  <Pod {...omit(props, ['resultData'])}>
    {children}
    <Inner {...props} />
  </Pod>
))
