import { FakeData } from '@/server/schema/types'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { compose, setDisplayName, shouldUpdate, withProps, withState } from 'recompose'

import Stats from './stats'
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

interface TInner {
  isOpen: boolean
  open: (b: boolean) => void
  parentProps: Partial<TOutter>
}

export default compose<TInner & TOutter, TOutter>(
  setDisplayName('pod'),
  withState('isOpen', 'open', false),
  withProps(({ open, name, data, ...props }) => ({
    parentProps: props
  }))
)(({ children, parentProps, ...props }) => (
  <Pod {...parentProps}>
    {children}
    <Inner {...props} />
  </Pod>
))

const Inner = compose<TInner & TOutter, {}>(
  shouldUpdate<TOutter & TInner>(
    (props, nextProps) => nextProps.open !== props.open || !/(resizing|dragging)/.test(nextProps.className)
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

    {isOpen && <Stats />}
  </div>
))
