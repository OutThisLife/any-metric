import styled from 'styled-components'

import Box from '../Box'

export default styled<any>(Box)`
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li ul {
    margin-left: 1em;
  }
`
