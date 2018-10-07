import { FakeData } from '@/server/schema/types'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { compose, setDisplayName, shouldUpdate, withState } from 'recompose'

import Charts from './charts'
import Pod from './style'
import DataTable from './table'
import Title from './title'

interface TOutter {
  name: string
  children?: React.ReactNode
  data: FakeData[]
  className?: string
  style?: string
}

interface TState {
  isOpen: boolean
  open: (b: boolean) => void
}

export default compose<TState & TOutter, TOutter>(
  setDisplayName('pod'),
  withState('isOpen', 'open', false)
)(({ children, ...props }) => (
  <Pod {...props}>
    {children}
    <Inner {...props} />
  </Pod>
))

const Inner = compose<TState & TOutter, {}>(
  shouldUpdate<TOutter & TState>(
    (props, nextProps) =>
      nextProps.open !== props.open ||
      (!/(resizing|dragging)/.test(nextProps.className))
  )
)(({ open, isOpen, name, data, ...props }) => (
  <div>
    <Title
      title={name}
      services={[IoLogoReddit, IoLogoTwitter]}
      onClick={() => open(!isOpen)}
      grid={props['data-grid']}
    />

    <DataTable data={data} />

    {isOpen && <Charts />}
  </div>
))
