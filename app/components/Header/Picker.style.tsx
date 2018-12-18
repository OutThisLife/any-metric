import { Box } from 'rebass'
import styled from 'styled-components'

export default styled(Box)`
  z-index: 1000;
  position: fixed;
  top: var(--pad);
  right: var(--pad);

  @media (max-width: 1025px) {
    display: none;
  }

  > .circle-picker {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(min-content, 0));
    align-items: center;
    width: auto !important;

    > div {
      flex-direction: inherit;
      width: auto !important;
      margin-bottom: 1em;
    }

    [style*='border-radius'] {
      border-radius: 0 !important;
    }
  }
`
