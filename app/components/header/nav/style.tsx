import styled from 'styled-components'

export default styled<any>('div')`
  display: inherit;
  height: inherit;
  align-self: flex-end;
  align-items: flex-end;

  a {
    display: inline-block;
    padding: 0.7em 0;
    box-shadow: inset 0 -2px currentColor;

    &.active sup {
      display: none;
    }

    &:not(.active):not(:hover) {
      box-shadow: none;
    }

    + a {
      margin-left: calc(var(--pad) * 1.25);
    }
  }
`
