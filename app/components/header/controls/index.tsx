import withLayout, { LayoutProps } from '@/lib/withLayout'
import { IoIosList, IoMdApps } from 'react-icons/io'
import { compose, setDisplayName } from 'recompose'

import Controls from './style'

interface TInner extends LayoutProps {
  base: Partial<ReactGridLayout.Layout>
}

const gridFactor = 2
const listFactor = 10

export default compose<TInner, {}>(
  setDisplayName('header-controls'),
  withLayout()
)(({ changeLayout, layoutData: { layout: { cols, data: layout } } }) => (
  <Controls>
    <a
      href="javascript:;"
      className={layout[0].x === 0 ? 'active' : ''}
      data-tip="Grid layout"
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
      className={layout[0].x === cols / listFactor ? 'active' : ''}
      data-tip="Feed layout"
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
))
