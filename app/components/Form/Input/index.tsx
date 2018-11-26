import Box from '@/components/Box'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Input from './style'

export default compose<Props, Props>(
  defaultProps({
    type: 'text',
    autoComplete: 'off',
    paddingTop: 'calc(var(--pad) / 2)',
    paddingRight: 'var(--pad)',
    paddingBottom: 'calc(var(--pad) / 2)',
    paddingLeft: 'var(--pad)',
    borderRadius: 4
  }),
  setDisplayName('input')
)(props => (
  <Input>
    <Box is="input" {...props} />
    <Box {...props} />
  </Input>
))

type Props = React.HTMLAttributes<HTMLInputElement>
