import { Pane } from 'evergreen-ui'
import styled from 'styled-components'

export default styled<any>(Pane)`
  padding: 3px calc(var(--pad) / 2);

  > div > span:not([aria-selected='true']) > span {
    font-weight: 400;
  }

  > div > span > span {
    position: relative;

    svg {
      position: absolute;
      top: calc(50% - 4px);
      right: 8px;
    }
  }
`
