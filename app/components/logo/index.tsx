import { darken } from 'polished'
import styled, { css } from 'styled-components'

export default () => <Logo><span>baphometric</span></Logo>

const Logo = styled.h1`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colours.brand.colour};
    font-weight: 400;
    font-size: 1.65rem;
    font-family: ${theme.fonts.family.title};
    letter-spacing: 0.01em;
    text-align: center;
    text-transform: lowercase;
    text-shadow: 1px 1px 0px ${darken(0.05, theme.colours.brand.bg)};
    margin: 0;
    padding: var(--pad) calc(var(--pad) * 2);
    background: ${theme.colours.brand.bg};

    header & {
      padding-left: 0;
      padding-right: 0;
    }
  `};
`
