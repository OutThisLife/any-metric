import { Heading } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Heading)`
  display: inline-flex;
  align-items: center;
  padding: var(--pad) 0;

  > span {
    font-size: 1.8rem;
    line-height: 2;

    + span:before {
      content: '-';
      visibility: hidden;
    }

    &:nth-child(2n) {
      color: ${({ theme }) => theme.colours.muted};
    }
  }

  button:last-child:not(:only-child) {
    margin-left: 1.4em;
  }
`
