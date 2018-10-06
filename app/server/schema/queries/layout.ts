import { IFieldResolver } from 'graphql-tools'

import { Context } from '../types'

export interface Layout {
  cols: number
  data: ReactGridLayout.Layout[]
}

export default ((_, __, ctx): Layout => ({
  cols: 40,
  data: (ctx.cache.get('BAPH_LAYOUT') || [
    { i: 'a', x: 40 / 4, y: 0, w: 40 / 2, h: 40 / 3.5, maxH: 40 },
    { i: 'b', x: 40 / 4, y: 1, w: 40 / 2, h: 40 / 3.5, maxH: 40 }
  ]) as ReactGridLayout.Layout[]
})) as IFieldResolver<{}, Context>
