import { Box } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Box)`
  flex-wrap: wrap;

  div {
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
