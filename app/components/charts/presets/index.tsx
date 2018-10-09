import styled from 'styled-components'

export { default as Sentiment } from './sentiment'
export { default as Volume } from './volume'
export { default as Title } from '../title'

export interface DynamicChart<T = JSX.Element> {
  ref?: any
  children: (a: (newData: any[]) => T) => T
}

export interface Presets {
  Sentiment: DynamicComponent<DynamicChart>
  Volume: DynamicComponent<DynamicChart>
}

export const Container = styled.section`
  display: flex;
  align-items: flex-start;
  background: ${({ theme }) => theme.colours.bg};

  + section {
    margin-top: calc(var(--pad) * 3);
  }

  aside {
    width: 100%;
  }
`
