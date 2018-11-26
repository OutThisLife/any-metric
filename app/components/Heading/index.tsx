import Text from '@/components/Text'
import { compose, defaultProps, setDisplayName } from 'recompose'

export default compose<Props, Props>(
  defaultProps({
    is: 'h2',
    fontSize: '2rem',
    letterSpacing: '-0.03em'
  }),
  setDisplayName('heading')
)(({ title, ...props }) => (
  <Text {...props}>
    {title.split(' ').map(w => (
      <span key={Math.random()}>{w}</span>
    ))}
  </Text>
))

interface Props extends React.CSSProperties {
  title: string
  [key: string]: any
}
