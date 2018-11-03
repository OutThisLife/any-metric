import DataTable from '@/components/table'
import { flatten } from '@/lib/utils'
import { compose, setDisplayName, shouldUpdate } from 'recompose'

import { TInner as TOutter } from '.'
import Nav from './nav'
import { Inner } from './style'
import Title from './title'

export default compose<TOutter, TOutter>(
  setDisplayName('pod-inner'),
  shouldUpdate<TOutter>(
    (_, { className = '' }) => !/(resizing|dragging)/.test(className)
  )
)(({ onRef, name, results, renderedData, filter }) => (
  <Inner innerRef={onRef}>
    <header>
      <Title title={name} />
    </header>

    <aside>
      <Nav tags={flatten(results, 'tags').sort()} />
    </aside>

    <section>
      <DataTable initialData={renderedData} />
    </section>
  </Inner>
))
