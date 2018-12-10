import defaultTheme from '../../../theme'
import { Resolver } from '../types'

export const theme: Resolver = async (_, __, { cache }) => {
  const value = await cache.get('theme')

  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(defaultTheme)
}

export { default as products } from './products'
export { default as ebay } from './ebay'
