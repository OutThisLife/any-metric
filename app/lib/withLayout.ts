import { getLayout } from '@/lib/queries'
import { LayoutResult } from '@/server/schema/queries/layout'
import { timeout, Timer } from 'd3-timer'
import { MutationFunc } from 'react-apollo'
import { compose, setDisplayName, withHandlers } from 'recompose'

interface TInner {
  mutate: MutationFunc<{}, { layout: string }>
  layoutData: { layout: LayoutResult }
}

interface THandles {
  changeLayout: (layout: ReactGridLayout.Layout[]) => void
}

export type LayoutProps = TInner & THandles

export default () =>
  compose<TInner & THandles, {}>(
    setDisplayName('with-layout'),
    getLayout(),
    withHandlers<TInner, THandles>(() => {
      let tm: Timer

      return {
        changeLayout: ({
          mutate,
          layoutData: {
            layout: { __typename, id, cols }
          }
        }) => data => {
          if (tm) {
            tm.stop()
          }

          tm = timeout(
            () =>
              mutate({
                variables: { layout: JSON.stringify(data) },
                optimisticResponse: {
                  __typename: 'Mutation',
                  setLayout: {
                    __typename,
                    id,
                    cols,
                    data
                  }
                }
              }),
            155
          )
        }
      }
    })
  )
