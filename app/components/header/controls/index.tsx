import withLayout, { LayoutProps } from '@/lib/withLayout'
import { gridFactor, listFactor } from '@/server/schema/queries/layout'
import { Icon } from 'evergreen-ui'
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
      <Option
        title="Grid Style"
        icon="layout-grid"
        isActive={isGrid}
        onClick={() =>
          changeLayout(
            layout.map((d, y) => ({
              ...d,
              y: Math.max(0, y - gridFactor),
              x: (y % gridFactor) * (cols / gridFactor),
              w: cols / gridFactor
            }))
          )
        }
      />

      <Option
        title="Feed Style"
        icon="list"
        isActive={isList}
        onClick={() =>
          changeLayout(
            layout.map((d, y) => ({
              ...d,
              y,
              x: cols / listFactor,
              w: cols - (cols / listFactor) * 2
            }))
          )
        }
      />

      <Option
        title="Custom"
        icon="layout-auto"
        isActive={!(isList || isGrid)}
      />
    </Controls>
  )
)

const Option = ({
  title,
  icon,
  isActive,
  onClick = () => 1,
  ...props
}: {
  title: string
  icon: string
  isActive: boolean
  onClick?: () => void
  style?: { [key: string]: string | number }
}) => (
  <a
    href="javascript:;"
    className={isActive ? 'active' : ''}
    data-tip={title}
    data-place="bottom"
    onClick={onClick}
    {...props}>
    <Icon icon={icon} size={14} />
  </a>
)
