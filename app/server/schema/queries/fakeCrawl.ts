import { FakeCrawlResult, Resolver } from '../types'

export default (async (
  _,
  { id }: { id: string[] },
  { cache, fakeResultLoader, genFakeResults }
): Promise<FakeCrawlResult[]> => {
  if (id) {
    return (await fakeResultLoader(cache).loadMany(id)) || []
  }

  return (await genFakeResults(cache)) || []
}) as Resolver
