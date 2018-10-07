import styled from 'styled-components'

export default styled.aside`
  align-self: stretch;
  overflow: auto;
  padding: calc(var(--pad) * 2) 0;
  background: ${({ theme }) => theme.colours.bg};
` as any
