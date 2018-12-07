import styled from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  grid-row: 1;
  justify-self: flex-start;

  label {
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    grid-row: 1;

    tbody tr & {
      width: 100%;
      grid-column-start: 6;
      justify-content: flex-end;
      padding: var(--pad) 0;

      > div {
        flex-direction: column;
        align-items: flex-end;
      }

      label + label {
        margin: 4px 0 0 0;
      }
    }
  }
`
