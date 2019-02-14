import defaultTheme from '../../../theme'
import { Resolver } from '../types'

export default (async (_, __, { mongo }): Promise<string> => {
  const res = await mongo.theme.findOne<{
    _id?: string
    theme?: string
    updatedAt?: Date
  }>({})

  return 'theme' in res ? res.theme : JSON.stringify(defaultTheme)
}) as Resolver
