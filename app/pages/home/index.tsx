import DataGroup from '@/components/dataGroup'
import EntryDetail from '@/components/entryDetail'
import SplitPane from 'react-split-pane'
import styled from 'styled-components'

export default () => (
  <Home>
    <SplitPane split="vertical" defaultSize="66%">
      <section>
        <DataGroup title="DataMan 8050 (3)" />
        <DataGroup title="Another Product (100)" />
      </section>

      <section>
        <EntryDetail title="DataMan 8050" />
      </section>
    </SplitPane>
  </Home>
)

const Home = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;

  .Pane2 > section {
    height: 100%;
    overflow: auto;
  }
`
