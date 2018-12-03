import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import InputContainer, { Input } from './style'

export default compose<InputProps, InputProps>(setDisplayName('input'))(
  props => (
    <InputContainer>
      <Input {...props} />
    </InputContainer>
  )
)

export interface InputProps
  extends BoxProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  as?: any
  width?: any
  ref?: any
}

export { Input }
