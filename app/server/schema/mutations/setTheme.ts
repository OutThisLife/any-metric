import { Resolver } from '../types'

export default (async (_, { theme }: { theme: string }, { cache }) => {
  await cache.set('theme', theme)
  return theme
}) as Resolver
