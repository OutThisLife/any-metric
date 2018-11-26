import { Pane } from 'evergreen-ui'
import { compose, defaultProps, setDisplayName } from 'recompose'

interface Props extends React.CSSProperties {
  children?: React.ReactNode
  [key: string]: any
}

export default compose<Props, Props>(
  setDisplayName('box'),
  defaultProps({ is: 'div' })
)(props => <Pane {...props} />)
