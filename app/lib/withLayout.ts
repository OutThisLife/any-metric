import { getLayout } from '@/lib/queries'
import { LayoutResult } from '@/server/schema/queries/layout'
import { MutationFunc } from 'react-apollo'
import { compose, setDisplayName, withHandlers } from 'recompose'

interface TInner {
  mutate: MutationFunc<{}, { layout: ReactGridLayout.Layout[] }>
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
    withHandlers<TInner, THandles>(() => ({
      changeLayout: ({
        mutate,
        layoutData: {
          layout: { id, cols }
        }
      }) => (obj, layout = JSON.stringify(obj)) =>
        mutate({
          variables: { layout },
          optimisticResponse: {
            __typename: 'Mutation',
            setLayout: {
              __typename: 'LayoutResult',
              id,
              cols,
              data: JSON.parse(layout)
            }
          }
        })
    }))
  )
