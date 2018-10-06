import { getLayout } from '@/lib/queries'
import { Layout } from '@/server/schema/queries/layout'
import { MutationFunc } from 'react-apollo'
import { IoIosList, IoMdApps } from 'react-icons/io'
import { compose, setDisplayName, shallowEqual, withHandlers } from 'recompose'

import Controls from './style'

interface TInner {
  mutate: MutationFunc<{ layout: ReactGridLayout.Layout[] }>
  layoutData: { layout: Layout }
}

interface THandles {
  changeLayout: (layout: ReactGridLayout.Layout[]) => void
}

export default compose<TInner & THandles, {}>(
  setDisplayName('header-controls'),
  getLayout(),
  withHandlers<TInner, THandles>(() => ({
    changeLayout: ({ mutate }) => layout => mutate({ variables: { layout: JSON.stringify(layout) } })
  }))
)(({ changeLayout, layoutData: { layout: { cols, data } } }) => {
  const common = {
    h: cols / 3.5,
    maxH: cols,
    moved: false,
    static: false
  }

  const gridLayout = [
    { i: 'a', x: 0, y: 0, w: cols / 2, ...common },
    { i: 'b', x: cols / 2, y: 0, w: cols / 2, ...common }
  ]

  const listLayout = [
    { i: 'a', x: cols / 4, y: 0, w: cols / 2, ...common },
    { i: 'b', x: cols / 4, y: 1, w: cols / 2, ...common }
  ]

  return (
    <Controls>
      <a
        href="javascript:;"
        className={shallowEqual(data[0], gridLayout[0]) ? 'active' : ''}
        data-tip="Grid layout"
        data-place="bottom"
        onClick={() => changeLayout(gridLayout)}>
        <IoMdApps />
      </a>

      <a
        href="javascript:;"
        className={shallowEqual(data[0], listLayout[0]) ? 'active' : ''}
        data-tip="Feed layout"
        data-place="bottom"
        onClick={() => changeLayout(listLayout)}>
        <IoIosList />
      </a>
    </Controls>
  )
})
