import { createElement } from 'react'
import { IconType } from 'react-icons/lib/iconBase'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import InputContainer, { Input } from './style'

export default compose<InputProps, InputProps>(setDisplayName('input'))(
  ({ icon, ...props }) => (
    <InputContainer>
      <Input {...props} />
      {typeof icon === 'object' && createElement(icon)}
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
}

export { Input }
