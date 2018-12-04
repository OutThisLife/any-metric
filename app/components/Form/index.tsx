import { Flex, FlexProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export const Container = compose<FormProps, FormProps>(setDisplayName('form'))(
  ({ children, ...props }) => (
    <Flex
      as="form"
      action="javascript:;"
      method="post"
      alignItems="center"
      m={0}
      p={0}
      {...props}>
      {children}
    </Flex>
  )
)

export { default as Input } from './Input'
export { default as Checkbox } from './Checkbox'
export { default as Button } from './Button'

export interface FormProps
  extends FlexProps,
    React.HTMLAttributes<HTMLFormElement> {
  as?: any
  groupFields?: boolean
}
