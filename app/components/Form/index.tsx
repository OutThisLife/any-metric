import { Flex, FlexProps } from 'rebass'
import { compose, defaultProps, setDisplayName } from 'recompose'

export const Container = compose<FormProps, FormProps>(
  setDisplayName('form'),
  defaultProps({
    as: 'form',
    action: 'javascript:;',
    method: 'post'
  })
)(({ children, ...props }) => (
  <Flex alignItems="center" m={0} p={0} {...props}>
    {children}
  </Flex>
))

export { default as Input } from './Input'
export { default as Button } from './Button'

export interface FormProps
  extends FlexProps,
    React.HTMLAttributes<HTMLFormElement> {
  as?: any
  groupFields?: boolean
}
