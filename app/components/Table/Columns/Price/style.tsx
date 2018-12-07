import styled from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  grid-row: 1;

  @media (max-width: 768px) {
    grid-row-end: span 2;
  }

  > div > div {
    width: 100%;

    &:first-of-type {
      font-weight: 600;
    }

    &:last-of-type {
      font-size: 0.85rem;
      line-height: 1;
    }
  }
`
