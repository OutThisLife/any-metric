import Box from '@/components/Box'
import { compose, defaultProps, setDisplayName } from 'recompose'

import { InputProps } from '..'
import Input from './style'

export default compose<InputProps, InputProps>(
  defaultProps<InputProps>({
    type: 'text',
    autoComplete: 'off',
    paddingTop: 'calc(var(--pad) / 4)',
    paddingRight: 'var(--pad)',
    paddingBottom: 'calc(var(--pad) / 4)',
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
