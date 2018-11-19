import styled from 'styled-components'

export default styled<any>('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a {
    line-height: 0;

    + a {
      margin-left: calc(var(--pad) * 0.5);
    }
  }
`
