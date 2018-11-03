import { Pane } from 'evergreen-ui'
import styled from 'styled-components'

export default styled(props => <Pane {...props} />)`
  > div {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 25% 1fr;
    grid-gap: calc(var(--pad) * 2);
    margin: 0 auto;

    hgroup {
      grid-column: 1;
      text-align: right;
      margin: 0;
    }

    > div {
      grid-column: 2;
      margin-left: auto;
    }
  }
` as any
