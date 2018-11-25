import { Text } from 'evergreen-ui'
import { compose, defaultProps, mapProps, setDisplayName } from 'recompose'

interface Props extends React.CSSProperties {
  children?: React.ReactNode
  [key: string]: any
}

export default compose<Props, Props>(
  defaultProps({ style: {} }),
  mapProps<Props, Props>(({ style, ...props }) => {
    if ('backgroundImage' in props && /gradient/i.test(props.backgroundImage)) {
      style['-webkit-background-clip'] = 'text'
      style['-webkit-text-fill-color'] = 'transparent'
    }

    return { style, ...props }
  }),
  setDisplayName('text')
)(props => <Text {...props} />)
