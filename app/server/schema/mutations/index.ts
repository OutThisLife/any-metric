import { Resolver } from '../types'


export const setTheme: Resolver = async (_, { theme }, { cache }) => {
  await cache.set('theme', theme)
  return { value: theme }
}
