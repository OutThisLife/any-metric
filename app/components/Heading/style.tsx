import { Heading } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Heading)`
  display: inline-flex;
  align-items: center;

  > span + span:not([aria-label]) {
    margin-left: 8px;
  }

  button {
    margin-left: 2rem;
  }
`
