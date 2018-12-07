import { Box } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Box)`
  display: grid;
  align-items: flex-start;

  @media (min-width: 1025px) {
    grid-template: 'controls table';
    grid-template-columns: var(--mainGrid);
    grid-column-gap: var(--pad);
    align-self: stretch;
    overflow: hidden;
  }

  @media (max-width: 1025px) {
    grid-template: 'controls controls' 'table table';
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, min-content);
  }
`
