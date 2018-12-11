import defaultTheme from '../../../theme'
import { Resolver } from '../types'

export default (async (_, __, { cache }) => {
  const value = await cache.get('theme')

  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(defaultTheme)
}) as Resolver
