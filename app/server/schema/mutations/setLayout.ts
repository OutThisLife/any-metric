import { IFieldResolver } from 'graphql-tools'

import { cols as defaultCols, Layout } from '../queries/layout'
import { Context } from '../types'

export interface Args {
  cols?: number
  layout: string
}

export type SetLayout = (Args) => Layout

export default ((_, { cols = defaultCols, layout }: Args): Layout => ({
  cols,
  data: JSON.parse(layout)
})) as IFieldResolver<{}, Context>
