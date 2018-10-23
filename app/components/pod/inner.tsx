import DataTable from '@/components/table'
import { flatten } from '@/lib/utils'
import { IoLogoReddit, IoLogoTwitter } from 'react-icons/io'
import { compose, shouldUpdate } from 'recompose'

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
    <Title title={name} services={[IoLogoReddit, IoLogoTwitter]} />

    <Nav
      current={filter.action === 'TAG' ? filter.value : ''}
      tags={flatten(data, 'tags').sort()}
    />

    <DataTable initialData={renderedData} />
  </Inner>
))
