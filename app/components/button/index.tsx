import { Button, IconButton } from 'evergreen-ui'
import { compose, setDisplayName, withProps } from 'recompose'

interface TOutter {
  title?: string
  height?: number | string
  [key: string]: any
}

export default compose<TOutter, TOutter>(
  setDisplayName('button'),
  withProps(({ height = 32 }) => ({ height }))
)(
  ({ title = null, ...props }) =>
    title ? <Button {...props}>{title}</Button> : <IconButton {...props} />
)
