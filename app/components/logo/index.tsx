import styled, { css } from 'styled-components'

export default () => (
  <Logo>
    <span>baphometric</span>
  </Logo>
)

const Logo = styled.h1`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 900 !important;
    font-size: 2rem;
    font-family: ${theme.fonts.family.title};
    line-height: 1;
    text-align: center;
    margin: 0;
  `};
`
