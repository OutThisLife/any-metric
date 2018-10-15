import { darken } from 'polished'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { MdOpenInNew } from 'react-icons/md'
import styled, { css } from 'styled-components'

import { Cell } from '.'

export default ({ cellData: link }: Cell<string>) => (
  <Link
    href={`//twitter.com/${link}`}
    target="_blank"
    rel="noopener"
    className="datasrc">
    {Math.random() > 0.5 ? <IoLogoTwitter /> : <IoLogoReddit />}
    <MdOpenInNew />
  </Link>
)

const Link = styled.a`
  ${({ theme }) => css`
    display: block;
    position: relative;
    text-align: center;

    svg {
      width: 16px;
      margin: auto;
      fill: ${theme.colours.panel};
      stroke-width: 2em;
      stroke: ${darken(0.1, theme.colours.panel)};
      vertical-align: middle;
    }

    svg:last-child {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: calc(50% + 1px);
      fill: ${theme.colours.secondary};
      stroke: none;
      transform: translate(-45%, -50%);
    }

    [class$='Table__row']:hover & {
      svg:first-child {
        opacity: 0.1;
        transform: translate(50%, 0);
      }

      svg:last-child {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
  `};
`
