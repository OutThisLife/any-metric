import { Resolver } from '../types'

export const setTheme: Resolver = async (
  _,
  { theme }: { theme: string },
  { cache }
) => {
  await cache.set('theme', theme)
  return theme
}
