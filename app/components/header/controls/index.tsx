import withLayout, { LayoutProps } from '@/lib/withLayout'
import { gridFactor, listFactor } from '@/server/schema/queries/layout'
import { IoIosList, IoMdApps } from 'react-icons/io'
import { compose, setDisplayName, withProps } from 'recompose'

import Controls from './style'

interface TInner extends LayoutProps {
  isList: boolean
  isGrid: boolean
}

export default compose<TInner, {}>(
  setDisplayName('header-controls'),
  withLayout(),
  withProps<Partial<TInner>, TInner>(
    ({
      layoutData: {
        layout: { cols, data: layout }
      }
    }) => ({
      isGrid: layout.every(
        (l, i) => (!(i % 2) ? l.x === 0 : l.x === cols / gridFactor)
      ),
      isList: layout.every(l => l.x === cols / listFactor)
    })
  )
)(
  ({
    layoutData: {
      layout: { cols, data: layout }
    },
    changeLayout,
    isGrid,
    isList
  }) => (
    <Controls>
      <a
        href="javascript:;"
        className={isGrid ? 'active' : ''}
        data-tip="Grid Style"
        data-place="bottom"
        onClick={() =>
          changeLayout(
            layout.map((d, y) => ({
              ...d,
              y: Math.max(0, y - gridFactor),
              x: (y % gridFactor) * (cols / gridFactor),
              w: cols / gridFactor
            }))
          )
        }>
        <IoMdApps />
      </a>

      <a
        href="javascript:;"
        className={isList ? 'active' : ''}
        data-tip="Feed Style"
        data-place="bottom"
        onClick={() =>
          changeLayout(
            layout.map((d, y) => ({
              ...d,
              y,
              x: cols / listFactor,
              w: cols - (cols / listFactor) * 2
            }))
          )
        }>
        <IoIosList />
      </a>
    </Controls>
  )
)
