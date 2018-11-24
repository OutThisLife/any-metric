import { Button, IconButton } from 'evergreen-ui'
import { compose, setDisplayName, withProps } from 'recompose'

export default compose<TOutter, TOutter>(
  setDisplayName('button'),
  withProps(({ height = 32 }) => ({ height }))
)(
  ({ title, children, ...props }) =>
    title || children ? (
      <Button {...props}>{children || title}</Button>
    ) : (
      <IconButton {...props} />
    )
)

interface TOutter {
  children?: React.ReactNode
  title?: string
  height?: number | string
  iconBefore?: string | JSX.Element
  [key: string]: any
}
