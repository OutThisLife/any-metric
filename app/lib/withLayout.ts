import { getLayout } from '@/lib/queries'
import { LayoutResult } from '@/server/schema/queries/layout'
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
    withHandlers<TInner, THandles>(() => ({
      changeLayout: ({
        mutate,
        layoutData: {
          layout: { __typename, id, cols }
        }
      }) => data =>
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
        })
    }))
  )
