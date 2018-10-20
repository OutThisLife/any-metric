import { FakeCrawlResult, Resolver } from '../types'

export interface Args {
  ids: string[]
  tags: string[]
}

export type SetTags = (Args) => Promise<FakeCrawlResult[]>

export default (async (
  _,
  { ids, tags = [''] }: Args,
  { cache, genFakeResults }
): Promise<FakeCrawlResult[]> => {
  const initialData = await genFakeResults(cache)
  const newData = initialData.map(
    d =>
      ids.includes(d.id)
        ? {
            ...d,
            tags
          }
        : d
  )

  return cache.set('data', newData) && newData.filter(d => ids.includes(d.id))
}) as Resolver
