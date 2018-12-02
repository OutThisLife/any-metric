import { FlexProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import BaseForm from './style'

export const Container = compose<FormProps, FormProps>(setDisplayName('form'))(
  ({ children, ...props }) => (
    <BaseForm
      as="form"
      action="javascript:;"
      method="post"
      alignItems="center"
      m={0}
      p={0}
      {...props}>
      {children}
    </BaseForm>
  )
)

export { default as Input } from './Input'
export { default as Checkbox } from './Checkbox'
export { default as Button } from './Button'

export interface FormProps extends FlexProps {
  as?: any
  groupFields?: boolean
}
