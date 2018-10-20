import { rgba } from 'polished'
import { SVGAttributes } from 'react'
import styled, { css } from 'styled-components'

export default styled<
  {
    isOpen: boolean
    style?: SVGAttributes<'div'>
  },
  'div'
>('div').attrs({
  style: ({ theme, isOpen }) => ({
    color: isOpen ? theme.colours.secondary : 'initial'
  })
})`
  ${({ theme }) => css`
  display: inline-block;
  position: relative;

  > a {
    color: inherit;
  }

  nav {
    z-index: 100;
    position: absolute;
    top: 100%;
    left: 0;
    white-space: nowrap;
    padding: calc(var(--pad) / 2) 0;
    border: 1px solid ${rgba(theme.colours.base, 0.2)};
    border-radius: 2px 2px 4px 4px;
    box-shadow: 0 2px 4px ${rgba(theme.colours.base, 0.2)};
    background: ${theme.colours.bg};

    a[href] {
      display: block;
      font-weight: 400;
      color: ${theme.colours.base};
      text-decoration: none !important;
      padding: 0 calc(var(--pad) + 1em) 0 var(--pad);

      &:hover {
        color: ${theme.colours.base};
        background: ${rgba(theme.colours.base, 0.05)};
      }
    }
  `}
  }
`
