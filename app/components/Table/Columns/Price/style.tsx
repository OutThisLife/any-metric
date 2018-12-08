import styled from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  flex-wrap: wrap;

  tbody tr & div {
    width: 100%;

    &:first-of-type {
      align-self: flex-end;
      font-weight: 600;
    }

    &:last-of-type {
      align-self: flex-start;
      font-size: 0.85rem;
      line-height: 1;
    }
  }
`
