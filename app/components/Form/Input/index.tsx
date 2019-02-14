import { createElement } from 'react'
import { IconType } from 'react-icons/lib/iconBase'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import InputContainer, { Input } from './style'

export default compose<InputProps, InputProps>(setDisplayName('input'))(
  ({ icon, isFocused = false, ...props }) => (
    <InputContainer className={isFocused ? 'focused' : ''}>
      <Input {...props} />
      {icon && createElement(icon)}
    </InputContainer>
  )
)

export interface InputProps
  extends BoxProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  as?: any
  width?: any
  ref?: any
  icon?: IconType
  isFocused?: boolean
}

export { Input }
