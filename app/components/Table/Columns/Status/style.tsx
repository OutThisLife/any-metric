import styled from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  grid-row: 1;

  tbody & span {
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    grid-column-start: 5;
  }
`
