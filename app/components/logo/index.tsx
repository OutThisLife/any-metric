import { compose, setDisplayName } from 'recompose'
import styled, { css } from 'styled-components'

export default compose(setDisplayName('logo'))(() => (
  <Logo>
    <span>baphometric</span>
  </Logo>
))

const Logo = styled<any>('h1')`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 700 !important;
    font-size: 1.3rem;
    font-family: ${theme.fonts.family.title};
    line-height: 1;
    text-align: center;
    margin: 0;
  `};
`
