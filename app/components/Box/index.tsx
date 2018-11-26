import { Pane } from 'evergreen-ui'
import { compose, defaultProps, setDisplayName } from 'recompose'

export default compose<BoxProps, BoxProps>(
  setDisplayName('box'),
  defaultProps<BoxProps>({ is: 'div' })
)(props => <Pane {...props} />)

export interface BoxProps<T = HTMLElement>
  extends React.CSSProperties,
    React.HTMLAttributes<T> {
  is?: string
  children?: React.ReactNode
  [key: string]: any
}

export type ReactBox<P = {}, T = HTMLElement> = React.ComponentType<
  BoxProps<T & P>
>
