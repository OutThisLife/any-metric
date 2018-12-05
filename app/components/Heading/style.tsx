import { Heading } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Heading)`
  display: inline-flex;
  align-items: center;

  > span {
    font-size: inherit;

    + span:before {
      content: '-';
      visibility: hidden;
    }

    &:nth-child(2n) {
      color: ${({ theme }) => theme.colours.muted};
    }
  }

  button {
    margin-left: 1.4em;
  }
`
