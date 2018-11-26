import Box from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { Button as EgButton, IconButton } from 'evergreen-ui'
import { compose, defaultProps, setDisplayName, withProps } from 'recompose'

import { ButtonProps as BaseButton, IForm } from '..'
import Button from './style'

export default compose<ButtonProps & BaphoTheme, ButtonProps>(
  defaultProps<ButtonProps>({
    is: 'button',
    type: 'submit',
    variant: 'cta'
  }),
  withProps<ButtonProps, ButtonProps>(props => {
    const iconOnly = 'iconSize' in props && !('children' in props)

    return {
      C: iconOnly ? IconButton : EgButton,
      borderRadius: iconOnly ? props.iconSize : 4,
      ...props
    }
  }),
  setDisplayName('button')
)(({ C, variant, style = {}, className, children, ...props }: ButtonProps) => (
  <Button
    aria-label={'iconSize' in props ? 'icon-cta' : 'cta'}
    className={className}
    style={style}
    variant={variant}>
    <C {...props}>
      <em>{children}</em>
    </C>

    {'iconSize' in props ? (
      <Box
        is="span"
        width={props.iconSize}
        height={props.iconSize}
        borderRadius={props.borderRadius}
      />
    ) : (
      <Box
        is="span"
        display="block"
        width="100%"
        height="100%"
        borderRadius={props.borderRadius}
      />
    )}
  </Button>
))

export interface ButtonProps extends BaseButton {
  C?: IForm['Button']
  variant?: 'cta' | 'basic' | string
  iconOnly?: boolean
  iconSize?: number
  iconBefore?: string
  iconAfter?: string
}
