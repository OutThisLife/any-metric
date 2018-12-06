import defaultTheme from '../../../theme'
import { Resolver } from '../types'

export const theme: Resolver = async (_, __, { cache }) => {
  const value = await cache.get('theme')

  if (typeof value === 'string') {
    return { value }
  }

  return { value: JSON.stringify(defaultTheme) }
}

export { default as ebay } from './ebay'
export { default as mockData } from './mockData'
export { google, crawl } from './web'
