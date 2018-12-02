import { ButtonProps } from 'rebass'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Button from './style'

export default compose<FormButtonProps, FormButtonProps>(
  defaultProps<FormButtonProps>({
    as: 'button',
    type: 'submit',
    variant: 'basic'
  }),
  setDisplayName('button')
)(({ children, ...props }) => (
  <Button
    aria-label={/icon/gi.test(props.variant) ? 'icon-cta' : 'cta'}
    {...props}>
    {/icon/gi.test(props.variant) ? (
      children
    ) : (
      <span style={{ font: 'inherit', lineHeight: 'inherit' }}>{children}</span>
    )}
  </Button>
))

export interface FormButtonProps
  extends ButtonProps,
    Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  as?: any
  variant?: string
}
