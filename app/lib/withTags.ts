import { Args as SetTagArgs } from '@/server/schema/mutations/setTags'
import { FakeResult } from '@/server/schema/types'
import { MutationFunc } from 'react-apollo'
import {
  compose,
  onlyUpdateForKeys,
  setDisplayName,
  withHandlers
} from 'recompose'

import { getTags } from './queries'

export default () =>
  compose<TagHandles & TagProps, {}>(
    getTags(),
    onlyUpdateForKeys(['tags']),
    withHandlers<TagProps, TagHandles>(() => ({
      setTag: ({ mutate }) => async (
        { id, tags: curTags },
        t = '',
        cb = () => null
      ) => {
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

        await cb(tags)
        window.requestAnimationFrame(() => mutate({ variables: { ids, tags } }))
      }
    })),
    setDisplayName('with-tags')
  )

interface TagProps {
  tags: string[]
  mutate: MutationFunc<{}, SetTagArgs>
}

export interface TagHandles {
  setTag: (a: FakeResult, t: string, cb: (t: string[]) => any) => void
}
