import { getLayout } from '@/lib/queries'
import { Layout } from '@/server/schema/queries/layout'
import { MutationFunc } from 'react-apollo'
import { compose, setDisplayName, withHandlers } from 'recompose'

interface TInner {
  mutate: MutationFunc<{ layout: ReactGridLayout.Layout[] }>
  layoutData: { layout: Layout }
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
      changeLayout: ({ mutate }) => layout => mutate({ variables: { layout: JSON.stringify(layout) } })
    }))
  )
