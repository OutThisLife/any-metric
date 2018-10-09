import withLayout, { LayoutProps } from '@/lib/withLayout'
import { IoIosList, IoMdApps } from 'react-icons/io'
import { compose, setDisplayName } from 'recompose'

import Controls from './style'

interface TInner extends LayoutProps {
  base: Partial<ReactGridLayout.Layout>
}

export default compose<TInner, {}>(
  setDisplayName('header-controls'),
  withLayout()
)(({ changeLayout, layoutData: { layout: { cols, data } } }) => (
    <Controls>
      <a
        href="javascript:;"
        className={data[0].w === cols / 2 ? 'active' : ''}
        data-tip="Grid layout"
        data-place="bottom"
        onClick={() => changeLayout(data.map((d, y) => ({
          ...d,
          y: Math.max(0, y - 2),
          x: (y % 2) * (cols / 2),
          w: cols / 2
        })))}>
        <IoMdApps />
      </a>

      <a
        href="javascript:;"
        className={data[0].w === cols ? 'active' : ''}
        data-tip="Feed layout"
        data-place="bottom"
        onClick={() => changeLayout(data.map((d, y) => ({
          ...d,
          y,
          x: cols / 4,
          w: cols / 2
        })))}>
        <IoIosList />
      </a>
    </Controls>
  )
)
