import Button from '@/components/button'
import Title from '@/components/pod/title/style'
import { getLayout } from '@/lib/queries'
import { Layout } from '@/server/schema/queries/layout'
import { MutationFunc } from 'react-apollo'
import { IoMdAddCircle, IoMdExpand, IoMdRemove } from 'react-icons/io'
import { IconType } from 'react-icons/lib/iconBase'
import { compose, setDisplayName, StateHandler, StateHandlerMap, withStateHandlers } from 'recompose'

interface TOutter {
  title: string
  services: IconType[]
  grid: ReactGridLayout.Layout
  onClick?: () => any
}

interface TInner {
  mutate: MutationFunc<{ layout: ReactGridLayout.Layout[] }>
  layoutData: { layout: Layout }
}

interface TState {
  lastLayout: Layout
}

interface TStateHandles extends StateHandlerMap<TState> {
  maximize: StateHandler<TState>
}

export default compose<TOutter & TInner & TState & TStateHandles, TOutter>(
  setDisplayName('pod-title'),
  getLayout(),
  withStateHandlers<TState, TStateHandles, TInner & TOutter>(
    ({ layoutData: { layout } }) => ({
      lastLayout: layout
    }),
    {
      maximize: ({ lastLayout }, { grid, layoutData: { layout }, mutate }) => e => {
        e.stopPropagation()

        if (grid.w === layout.cols) {
          mutate({ variables: { layout: JSON.stringify(lastLayout.data) } })
          return {}
        }

        mutate({
          variables: {
            layout: JSON.stringify(
              layout.data.map(l => {
                if (l.i === grid.i) {
                  return {
                    ...l,
                    w: layout.cols,
                    h: layout.cols / 3
                  }
                }

                return l
              })
            )
          }
        })

        return {
          lastLayout: layout
        }
      }
    }
  )
)(({ grid, layoutData: { layout }, maximize, title, services = [], onClick = () => null }) => (
  <Title>
    <div className="drag-h" />

    <div>
      <small>
        Updated&nbsp;
        <time>6 hours ago</time>
        <span>
          &mdash;
          <a href="javascript:;" onClick={e => e.stopPropagation()}>
            refresh
          </a>
          ,&nbsp;
          <a href="javascript:;" onClick={e => e.stopPropagation()}>
            schedule
          </a>
        </span>
      </small>

      <nav>
        <a href="javascript:;" onClick={maximize}>
          {grid.w === layout.cols ? <IoMdRemove /> : <IoMdExpand />}
        </a>
      </nav>
    </div>

    <div>
      <h2 onClick={onClick}>
        <a href="javascript:;">{title}</a>
      </h2>

      <nav>
        {services.length && (
          <figure>
            {[].slice.call(services).map((I: IconType) => (
              <a key={Math.random()} href="javascript:;">
                <I />
              </a>
            ))}
          </figure>
        )}

        <Button href="javascript:;" Icon={<IoMdAddCircle />} data-tip="Add source" />
      </nav>
    </div>
  </Title>
))
