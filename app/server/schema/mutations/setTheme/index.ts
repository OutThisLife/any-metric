import { Resolver } from '../../types'

export default (async (_, { theme }, { cache }) => {
  await cache.set('theme', theme)
  return { value: theme }
}) as Resolver
