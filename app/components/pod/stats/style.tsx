import { Pane } from 'evergreen-ui'
import styled from 'styled-components'

export default styled(props => <Pane is="aside" {...props} />)`
  --s: 0;

  z-index: 10;
  position: absolute;
  top: 35px;
  right: var(--s);
  bottom: var(--s);
  left: var(--s);
  overflow: auto;
  padding: var(--pad);
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.175);
  transition-property: opacity, transform;
  transform-origin: center;
  background: ${({ theme }) => theme.colours.bg};

  + div {
    transition: filter 0.2s ease;
  }

  &:not(.open) {
    opacity: 0;
    pointer-events: none;

    * {
      pointer-events: none !important;
    }
  }

  &.open + div {
    filter: blur(5px) brightness(1.4) opacity(0.4);
  }

  > div {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 17% 1fr;
    grid-gap: var(--pad);
    margin: 0;

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
`
