import { FakeCrawlResult } from '@/server/schema/types'
import omit from 'lodash/omit'
import { compose, setDisplayName } from 'recompose'

import Inner from './inner'
import Pod from './style'

interface TOutter {
  name: string
  children?: React.ReactNode
  data: FakeCrawlResult[]
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
