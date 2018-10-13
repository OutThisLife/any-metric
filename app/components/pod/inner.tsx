import { FakeCrawlResult } from '@/server/schema/types'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import {
  compose,
  shouldUpdate,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

import Nav from './nav'
import { Inner } from './style'
import DataTable from './table'
import Title from './title'

interface TOutter {
  name: string
  children?: React.ReactNode
  data: FakeCrawlResult[]
  className?: string
}

interface TState {
  data: FakeCrawlResult[]
  initialData: FakeCrawlResult[]
  filter: string
}

interface TStateHandles extends StateHandlerMap<TState> {
  filterData: StateHandler<TState>
}

export default compose<TOutter & TStateHandles & TState, TOutter>(
  shouldUpdate<TOutter>(
    (_, nextProps) => !/(resizing|dragging)/.test(nextProps.className)
  ),
  withStateHandlers<TState, TStateHandles, TState>(
    ({ data }) => ({ filter: '', initialData: data, data }),
    {
      filterData: ({ initialData }) => (filter: string) => ({
        filter,
        data: filter.length
          ? initialData.filter(d => d.tags.includes(filter))
          : initialData
      })
    }
  )
)(({ open, isOpen, filter, filterData, name, ...props }) => (
  <Inner>
    <Title title={name} services={[IoLogoReddit, IoLogoTwitter]} />

    <Nav
      active={filter}
      onClick={filterData}
      tags={props.initialData
        .reduce((acc, d) => acc.push(...d.tags) && acc, [])
        .filter((t, i, self) => t && self.indexOf(t) === i)}
    />

    <DataTable initialData={props.data} />
  </Inner>
))
