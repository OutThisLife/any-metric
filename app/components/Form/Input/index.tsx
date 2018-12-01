import Box from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { compose, defaultProps, mapProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import { InputProps } from '..'
import Input from './style'

export default compose<InputProps, InputProps>(
  defaultProps<InputProps>({
    type: 'text',
    autoComplete: 'off',
    paddingTop: 'calc(var(--pad) / 3.2)',
    paddingRight: 'var(--pad)',
    paddingBottom: 'calc(var(--pad) / 3.2)',
    paddingLeft: 'var(--pad)',
    borderRadius: 4
  }),
  withTheme,
  mapProps<InputProps, InputProps & BaphoTheme>(
    ({ theme, background = theme.inputs.bg, ...props }) => ({
      background,
      ...props
    })
  ),
  setDisplayName('input')
)(props => (
  <Input>
    <Box is="input" {...props} />
  </Input>
))
