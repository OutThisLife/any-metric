import { Resolver, Result } from '../types'
import crawl from './crawl'

export default (async (_, { q }: { q: string }): Promise<Result> =>
  crawl(
    null,
    {
      url: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      selectors: ['.g a:first-child']
    },
    null,
    null
  )) as Resolver
