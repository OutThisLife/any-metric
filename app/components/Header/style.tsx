import styled from 'styled-components'

import Box from '../Box'

export default styled<any>(Box)`
  .circle-picker[style] {
    width: 33% !important;
    white-space: nowrap !important;
    flex-wrap: nowrap !important;
    justify-content: center !important;
    overflow: auto !important;

    span div {
      margin-bottom: 0 !important;
    }
  }
`
