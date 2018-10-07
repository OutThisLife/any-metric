import styled from 'styled-components'

export default styled.section`
  background: white;

  label, strong {
    display: block;
  }

  strong {
    font-size: 1.5rem;
    line-height: 1;
  }

  + section {
    margin-top: calc(var(--pad) * 3);
  }
`
