import { flatten } from '@/lib/utils'
import { FakeCrawlResult } from '@/server/schema/types'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import {
  compose,
  shouldUpdate,
  StateHandler,
  StateHandlerMap,
  withStateHandlers
} from 'recompose'

import { TOutter } from '.'
import Nav from './nav'
import { Inner } from './style'
import DataTable from './table'
import Title from './title'

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
  withStateHandlers<TState, TStateHandles, TOutter>(
    ({ fakeCrawl: data }) => ({ filter: '', initialData: data, data }),
    {
      filterData: ({ initialData: data }) => (filter: string) => ({
        filter,
        data: filter.length ? data.filter(d => d.tags.includes(filter)) : data
      })
    }
  )
)(({ open, isOpen, filter, filterData, name, ...props }) => (
  <Inner>
    <Title title={name} services={[IoLogoReddit, IoLogoTwitter]} />

    <Nav
      active={filter}
      filterData={filterData}
      tags={flatten(props.initialData, 'tags')}
    />

    <DataTable initialData={props.data} filterData={filterData} />
  </Inner>
))
