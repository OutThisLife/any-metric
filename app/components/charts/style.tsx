import styled from 'styled-components'

export default styled.section`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 300px;
  background: ${({ theme }) => theme.colours.bg};

  + section {
    margin-top: calc(var(--pad) * 3);
  }
`
