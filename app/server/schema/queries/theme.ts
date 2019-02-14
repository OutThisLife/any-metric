import defaultTheme from '../../../theme'
import { Resolver } from '../types'

export default (async (): Promise<string> =>
  JSON.stringify(defaultTheme)) as Resolver
