import Box from '@/components/Box'
import styled from 'styled-components'

export default styled(Box)`
  display: grid;
  grid-template-columns: repeat(40, 1fr);

  @media (min-width: 1440px) {
    height: calc(100% - var(--offset));
    overflow: auto;
  }

  @media (max-width: 1440px) {
    grid-row-gap: var(--offset);
  }

  > div {
    @media (min-width: 1440px) {
      grid-row: 1;
      height: 100%;

      &:first-child {
        grid-column: 23 / -1;
      }

      &:last-child {
        grid-column: 1 / 23;
      }
    }

    @media (max-width: 1440px) {
      grid-column: 1 / -1;

      &:first-child {
        grid-row: 2;
      }

      &:last-child {
        grid-row: 1;
      }
    }
  }
`
