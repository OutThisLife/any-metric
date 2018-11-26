import { genFakeResults } from '../queries/fakeCrawl'
import { FakeResult, Resolver } from '../types'

export default (async (
  _,
  { ids, tags = [''] }: Args
): Promise<FakeResult[]> => {
  const initialData = await genFakeResults()

  return initialData
    .map(d =>
      ids.includes(d.id)
        ? {
            ...d,
            tags
          }
        : d
    )
    .filter(d => ids.includes(d.id))
}) as Resolver

export interface Args {
  ids: string[]
  tags: string[]
}

export type SetTags = (Args) => Promise<FakeResult[]>
