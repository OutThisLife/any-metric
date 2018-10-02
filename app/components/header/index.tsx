import Button from '@/components/button'
import Logo from '@/components/logo'
import { rgba } from 'polished'
import styled, { css } from 'styled-components'

export default () => (
  <Header>
    <Logo />

    <nav>
      <div>
        <a href="javascript:;" className="active">
          All Views <sup>(12)</sup>
        </a>

        <a href="javascript:;">Social <sup>(2)</sup></a>
        <a href="javascript:;">Finance <sup>(20)</sup></a>
      </div>

      <div>
        <Button title="Create View" />
        <Button variant="primary" title="Add Pod" />
      </div>
    </nav>
  </Header>
)

const Header = styled.header`
  ${({ theme }) => css`
    z-index: 500;
    position: relative;
    box-shadow: 0 1px 3px 0 ${rgba(theme.colours.base, 0.15)};

    nav {
      display: flex;
      align-items: center;
      padding: var(--pad) calc(var(--pad) * 2);

      > div:first-of-type {
        transform: translate(0, var(--pad));
      }

      > div:last-of-type {
        margin-left: auto;
      }
    }

    nav > div:first-of-type a {
      display: inline-block;
      font-weight: 600;
      text-decoration: none;
      box-shadow: inset 0 -2px currentColor;
      padding: 0.5em 0;
      transition-property: color, box-shadow;

      &.active {
        color: ${theme.colours.secondary};

        sup {
          display: none;
        }
      }

      &:not(.active) {
        color: ${rgba(theme.colours.base, 0.5)};

        &:hover {
          color: ${rgba(theme.colours.base, 0.55)};
        }

        &:not(:hover) {
          box-shadow: none;
        }
      }

      + a {
        margin-left: 1.5em;
      }
    }
  `};
`
