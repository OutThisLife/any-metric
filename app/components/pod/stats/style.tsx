import styled from 'styled-components'

export default styled.aside`
  align-self: stretch;
  overflow: auto;
  padding: calc(var(--pad) * 2);
  background: ${({ theme }) => theme.colours.bg};

  section {
    width: 100%;
    height: 350px;
  }
` as any
