import { Box } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Box)`
  @media (min-width: 1025px) {
    grid-template: 'table controls';
    grid-template-columns: repeat(2, 1fr);
    align-self: stretch;
    overflow: hidden;
  }

  @media (max-width: 1025px) {
    grid-template: 'table table' 'controls controls';
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, min-content);
  }

  > div {
    position: relative;

    &:first-child {
      @media (min-width: 1025px) {
        padding-left: calc(var(--offset) / 2);

        .head,
        .row {
          padding-left: calc(var(--offset) / 2);
        }
      }

      @media (max-width: 1025px) {
        grid-row: 2;
        padding: 0 var(--offset) var(--offset);
      }
    }

    &:last-child {
      @media (min-width: 1025px) {
        padding-right: var(--offset);
      }

      @media (max-width: 1025px) {
        grid-row: 1;
        padding: 0 var(--offset) 0;
      }
    }
  }
`
