import { Box } from 'rebass'
import styled from 'styled-components'

export default styled<any>(Box)`
  display: inline-block;
  line-height: 1;
  padding: 2px 4px;
  border: 1px solid transparent;
  border-radius: var(--radius);

  + label {
    margin-left: 0.2em;
  }
`
