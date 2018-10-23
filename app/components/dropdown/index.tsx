import { SelectMenu } from 'evergreen-ui'
import { compose, pure } from 'recompose'

interface TOutter {
  title: string
  children: React.ReactNode
  [key: string]: any
}

export default compose<TOutter, TOutter>(pure)(
  ({ children, title, ...props }) => (
    <SelectMenu
      isMultiSelect
      hasFilter={props.options.length > 10}
      title={title}
      minWidth={0}
      minPopoverHeight={0}
      {...props}>
      {children}
    </SelectMenu>
  )
)
