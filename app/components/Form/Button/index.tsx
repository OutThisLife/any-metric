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
    const iconOnly = 'icon' in props && !('children' in props)

    return {
      iconOnly,
      C: iconOnly ? IconButton : EgButton,
      borderRadius: iconOnly ? props.iconSize : '100em',
      ...props
    }
  }),
  setDisplayName('button')
)(
  ({
    C,
    iconOnly,
    variant,
    style = {},
    className,
    children,
    ...props
  }: ButtonProps) => (
    <Button
      aria-label={iconOnly ? 'icon-cta' : 'cta'}
      className={className}
      style={style}
      variant={variant}>
      <C {...props}>
        <span style={{ font: 'inherit', lineHeight: 'inherit' }}>
          {children}
        </span>
      </C>
    </Button>
  )
)

export interface ButtonProps extends BaseButton {
  C?: IForm['Button']
  variant?: 'cta' | 'basic' | string
  iconOnly?: boolean
  iconSize?: number
  iconBefore?: string
  iconAfter?: string
}
