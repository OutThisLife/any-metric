import DataTable from '@/components/table'
import { flatten } from '@/lib/utils'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { compose, shouldUpdate, withState } from 'recompose'

import { TInner as TOutter } from '.'
import Nav from './nav'
import { Inner } from './style'
import Title from './title'

interface TState {
  filter: string
  filterData: (s: string) => void
}

export default compose<TOutter & TState, TOutter>(
  shouldUpdate<TOutter & TState>(
    (props, nextProps) =>
      !/(resizing|dragging)/.test(nextProps.className) ||
      props.filter !== nextProps.filter
  ),
  withState('filter', 'filterData', '')
)(({ resultData: { fakeCrawl: data }, filter, filterData, name }) => (
  <Inner>
    <Title title={name} services={[IoLogoReddit, IoLogoTwitter]} />

    <Nav
      active={filter}
      filterData={filterData}
      tags={flatten(data, 'tags').sort()}
    />

    <DataTable
      initialData={
        filter.length ? data.filter(d => d.tags.includes(filter)) : data
      }
      filterData={filterData}
    />
  </Inner>
))
