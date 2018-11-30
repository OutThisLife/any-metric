import Box from '@/components/Box'
import styled from 'styled-components'

export default styled(Box)`
  @media (min-width: 1025px) {
    grid-template-columns: repeat(2, 1fr);
    align-self: stretch;
    overflow: hidden;
  }

  > div {
    position: relative;
    width: 100%;
    align-self: inherit;

    @media (min-width: 1025px) {
      &:first-child {
        padding-left: calc(var(--offset) / 2);

        .head,
        .row {
          padding-left: calc(var(--offset) / 2);
        }
      }

      &:last-child {
        padding-right: var(--offset);
      }
    }
  }
`
