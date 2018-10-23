import DataTable from '@/components/table'
import { flatten } from '@/lib/utils'
import { Pane } from 'evergreen-ui'
import { compose, shouldUpdate } from 'recompose'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip
} from 'victory'

import { TInner } from '.'
import Nav from './nav'
import { Inner } from './style'
import Title from './title'

export default compose<TInner, TInner>(
  shouldUpdate<TInner>(
    (_, nextProps) => !/(resizing|dragging)/.test(nextProps.className)
  )
)(({ onRef, renderedData, resultData: { fakeCrawl: data }, filter, name }) => (
  <Inner innerRef={onRef}>
    <Title title={name} />

    <Nav
      current={filter.action === 'TAG' ? filter.value : ''}
      tags={flatten(data, 'tags').sort()}
    />

    <section>
      <Pane is="aside" padding={10} elevation={4}>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
          />
          <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            data={[
              { quarter: 1, earnings: 13000, label: 13000 },
              { quarter: 2, earnings: 16500, label: 16500 },
              { quarter: 3, earnings: 14250, label: 14250 },
              { quarter: 4, earnings: 19000, label: 19000 }
            ]}
            x="quarter"
            y="earnings"
          />
        </VictoryChart>
      </Pane>

      <DataTable initialData={renderedData} />
    </section>
  </Inner>
))
