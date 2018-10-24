import { Pane } from 'evergreen-ui'
import styled from 'styled-components'

export default styled(Pane)`
  position: relative;
  height: 100%;
  overflow: auto;
  margin: auto;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;

    hgroup {
      width: 25%;
      text-align: right;
      margin: 0;
    }

    > div {
      max-width: calc(100% - 25%);
    }
  }
`
