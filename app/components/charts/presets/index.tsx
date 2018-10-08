import styled from 'styled-components'

export { default as Sentiment } from './sentiment'
export { default as Volume } from './volume'
export { default as Title } from '../title'

export const Container = styled.section`
  display: flex;
  align-items: flex-start;
  background: ${({ theme }) => theme.colours.bg};

  + section {
    margin-top: calc(var(--pad) * 3);
  }

  aside {
    width: 100%;

    svg, canvas {
      vertical-align: top;
    }
  }
`
