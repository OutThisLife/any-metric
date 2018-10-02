import { darken, lighten } from 'polished'
import styled, { css } from 'styled-components'

interface TOutter {
  title?: string
  Icon?: JSX.Element | React.SFC
  variant?: string
  [key: string]: any
}

export default ({ title, Icon, ...props }: TOutter) => (
  <Button {...props}>
    {title && typeof Icon === 'object' ? Icon : null}
    {title ? <span className="title">{title}</span> : <span className="icon">{Icon}</span>}
  </Button>
)

const variants = ({ theme, variant = 'normal' }: any) => {
  switch (variant) {
    default:
      return css`
        --color: ${lighten(0.4, theme.colours.base)};
        --borderColor: ${lighten(0.7, theme.colours.base)};

        &:hover {
          --color: ${theme.colours.base};
          --borderColor: ${theme.colours.base};
          --bg: ${lighten(0.85, theme.colours.base)};
        }
      `

    case 'primary':
      return css`
        --color: ${theme.colours.bg};
        --borderColor: ${darken(0.1, theme.colours.secondary)};
        --bg: ${theme.colours.secondary};

        &:hover {
          --borderColor: ${darken(0.15, theme.colours.secondary)};
          --bg: ${darken(0.05, theme.colours.secondary)};
        }
      `
  }
}

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  position: relative;
  vertical-align: top;
  color: var(--color, inherit);
  font-size: 11px;
  font-weight: 500;
  line-height: 0px;
  padding: 0;
  border: 1px solid var(--borderColor, transparent);
  border-radius: 2px;
  transition: 0.3s ease-in-out;
  background: var(--bg, transparent);

  + [class*="Button"] {
    margin-left: var(--pad);
  }

  > span {
    display: inherit;
    padding: 0.4em 0.8em;

    &:not(:only-child) {
      margin-left: 1em;
    }

    &.title {
      padding: 1.2em;
    }
  }

  svg {
    width: 1em;
    height: auto;
    fill: currentColor;
    vertical-align: middle;
  }

  > svg:not(:only-child) {
    position: absolute;
    top: 50%;
    left: 0.8em;
    transform: translate(0, -50%);
  }

  ${variants};
` as any
