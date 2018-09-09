import { darken, rgba } from 'polished'
import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

interface TOutter extends ButtonHTMLAttributes<any> {
  variant?: string
}

export default ({ title, children, ...props }: TOutter) => <Button {...props}>{title || children}</Button>

export const buttonStyles = css`
  ${({ theme, variant = 'default' }: any) => `
    color: ${theme.buttons[variant].colour};
    border-radius: ${theme.buttons[variant].radius || theme.buttons.radius}px;
    box-shadow: ${variant === 'primary' ? '0 3px 8px 2px rgba(0,0,0,.1)' : 'none'};
    background: ${theme.buttons[variant].bg} !important;

    &:not([disabled]):hover {
      color: ${theme.buttons[variant].colour};
      background: ${theme.buttons[variant].hover.bg} !important;

      &:active {
        color: ${rgba(theme.buttons[variant].colour, 0.8)};
        background: ${darken(0.04, theme.buttons[variant].hover.bg)} !important;
      }
    }
  `};

  user-select: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 700;
  font-size: ${({ theme }) => theme.buttons.size}px;
  letter-spacing: 0.07em;
  text-shadow: -1px 1px rgba(0, 0, 0, 0.2);
  line-height: 0;
  text-align: center;
  padding: calc(var(--pad) * 1.25) calc(var(--pad) * 1.3);
  border: 0;

  &[disabled] {
    opacity: 0.2;
    box-shadow: none;
  }
`

const Button = styled.button`
  ${buttonStyles};
`
