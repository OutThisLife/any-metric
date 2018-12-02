import { BaphoTheme } from '@/theme'
import { BoxProps } from 'rebass'
import { compose, mapProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

import InputContainer, { Input } from './style'

export default compose<InputProps, InputProps>(
  withTheme,
  mapProps<InputProps, InputProps & BaphoTheme>(
    ({ theme, bg = theme.inputs.bg, ...props }) => ({
      bg,
      ...props
    })
  ),
  setDisplayName('input')
)(props => (
  <InputContainer>
    <Input {...props} />
  </InputContainer>
))

export interface InputProps
  extends BoxProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  as?: any
  width?: any
  ref?: any
}

export { Input }
