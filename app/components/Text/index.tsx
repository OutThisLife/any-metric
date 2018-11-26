import { compose, setDisplayName } from 'recompose'

import Text from './style'

export default compose<TOutter, TOutter>(setDisplayName('text'))(props => (
  <Text display="inline-block" {...props} />
))

interface TOutter extends React.CSSProperties {
  children?: React.ReactNode
  [key: string]: any
}
