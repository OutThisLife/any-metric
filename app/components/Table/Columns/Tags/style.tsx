import styled from 'styled-components'

import Column from '../Column'

export default styled<any>(Column)`
  label {
    font-size: 0.85rem;

    + label {
      margin: 0 0 0 4px;
    }
  }
`
