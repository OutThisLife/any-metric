import { Pane } from 'evergreen-ui'
import styled from 'styled-components'

export default styled(props => <Pane {...props} />)`
  display: inline-flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${({ theme }) => theme.colours.bg};

  > div {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 150px 250px;
    grid-gap: var(--pad);
    width: 500px;
    height: 100%;
    margin: 0 auto;

    hgroup {
      grid-column: 1;
      text-align: right;
      margin: 0;
    }

    > div {
      cursor: zoom-in;
      grid-column: 2;
      margin-left: auto;

      * {
        pointer-events: none;
      }
    }
  }
` as any
