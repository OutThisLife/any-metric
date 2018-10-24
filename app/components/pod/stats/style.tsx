import { Pane } from 'evergreen-ui'
import styled from 'styled-components'

export default styled(props => <Pane is="aside" {...props} />)`
  z-index: 10;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  position: absolute;
  top: -30px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  justify-content: space-between;
  background: ${({ theme }) => theme.colours.bg};

  > header {
    position: sticky;
    top: 0;
  }

  > div {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 150px 1fr;
    grid-gap: var(--pad);
    width: 50%;
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
