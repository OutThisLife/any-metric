import { compose, setDisplayName } from 'recompose'

import Dropdown from './style'

interface TOutter {
  title: string
  children: React.ReactNode
  [key: string]: any
}

export default compose<TOutter, TOutter>(setDisplayName('dropdown'))(
  ({ children, title, ...props }) => (
    <Dropdown
      isMultiSelect
      hasFilter={props.options.length > 10}
      title={title}
      minWidth={0}
      minPopoverHeight={0}
      {...props}>
      {children}
    </Dropdown>
  )
)
