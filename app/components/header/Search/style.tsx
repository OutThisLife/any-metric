import styled from 'styled-components'

export default styled<any>('form')`
  display: block;
  width: calc(100% - var(--pad));

  > div {
    display: block;
  }

  input {
    display: block;
    align-self: stretch;
    width: 100%;
  }
`
