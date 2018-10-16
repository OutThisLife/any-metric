import { IFieldResolver } from 'graphql-tools'

import { Context, FakeCrawlResult } from '../types'

export default (async (
  _,
  { id }: { id: string[] },
  { cache, fakeResultLoader, genFakeResults }
): Promise<FakeCrawlResult[]> => {
  if (id) {
    return await fakeResultLoader(cache).loadMany(id)
  }

  return await genFakeResults(cache)
}) as IFieldResolver<{}, Context>
