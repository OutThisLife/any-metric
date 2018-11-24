import { genFakeResults } from '../queries/fakeCrawl'
import { FakeCrawlResult, Resolver } from '../types'

export default (async (
  _,
  { ids, tags = [''] }: Args
): Promise<FakeCrawlResult[]> => {
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

export type SetTags = (Args) => Promise<FakeCrawlResult[]>
