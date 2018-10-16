import { FakeCrawlResult } from '@/server/schema/types'
import omit from 'lodash/omit'
import { DataValue } from 'react-apollo'
import { compose, setDisplayName } from 'recompose'

import Inner from './inner'
import Pod from './style'

export interface TOutter extends DataValue<{ fakeCrawl: FakeCrawlResult[] }> {
  name: string
  children?: React.ReactNode
  className?: string
}

export default compose<TOutter, TOutter>(setDisplayName('pod'))(
  ({ children, ...props }) => (
    <Pod {...omit(props, ['data'])}>
      {children}
      <Inner {...props} />
    </Pod>
  )
)
