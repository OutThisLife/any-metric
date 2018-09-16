import { darken, rgba } from 'polished'
import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

interface TOutter extends ButtonHTMLAttributes<any> {
  variant?: string
  primary?: boolean
  theme?: any
}

export default ({ title, children, ...props }: TOutter) => <Button {...props}>{title || children}</Button>

export const buttonStyles = css`
  --bg: ${({ primary, theme }: TOutter) => primary ? theme.buttons.bg : darken(0.03, theme.buttons.bg)};

  user-select: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${({ theme }) => theme.buttons.colour};
  font-weight: 700;
  font-size: ${({ theme }) => theme.buttons.size}px;
  letter-spacing: 0.07em;
  text-shadow: -1px 1px rgba(0, 0, 0, 0.2);
  line-height: 0;
  text-align: center;
  padding: calc(var(--pad) * 1.25) calc(var(--pad) * 1.3);
  border: 0;
  border-radius: ${({ theme }) => theme.buttons.radius}em;
  box-shadow: ${({ primary }: any) => primary && 'rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px'};
  transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
  background: var(--bg) !important;

  &[disabled] {
    opacity: 0.2;
    box-shadow: none;
  }

  &:not([disabled]):hover {
    --bg: ${({ theme }) => theme.buttons.hover.bg};
    color: ${({ theme }) => theme.buttons.colour};
    box-shadow: 0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149);

    &:active {
      --bg: ${({ theme }) => rgba(theme.colours.base, 0.04)};
      color: ${({ theme }) => rgba(theme.buttons.colour, 0.8)};
      box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
    }
  }
`

const Button = styled.button`
  ${buttonStyles};
`
