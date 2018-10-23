import { Args as SetTagArgs } from '@/server/schema/mutations/setTags'
import { FakeCrawlResult } from '@/server/schema/types'
import { MutationFunc, MutationUpdaterFn } from 'react-apollo'
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose'

import { getTags } from './queries'

interface TInner {
  tags: string[]
  mutate: MutationFunc<{}, SetTagArgs>
}

export interface THandles {
  setTag: (a: FakeCrawlResult, t: string, cb?: MutationUpdaterFn) => void
}

export default () =>
  compose<THandles & TInner, {}>(
    getTags(),
    onlyUpdateForKeys(['tags']),
    withHandlers<TInner, THandles>(() => ({
      setTag: ({ mutate }) => ({ __typename, id, tags: curTags }, t = '') => {
        const ids: string[] = [id]
        const tags: string[] = [].slice.call(curTags)

        if (curTags.includes(t)) {
          tags.splice(tags.indexOf(t), 1)
        } else {
          tags.push(t)
        }

        if (!tags.length) {
          tags.push('')
        }

        mutate({
          variables: { ids, tags },
          optimisticResponse: {
            __typename: 'Mutation',
            setTags: {
              __typename,
              id,
              tags
            }
          }
        })
      }
    }))
  )
