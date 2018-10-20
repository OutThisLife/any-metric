import { cols as defaultCols, id, LayoutResult } from '../queries/layout'
import { Resolver } from '../types'

export interface Args {
  cols?: number
  layout: string
}

export type SetLayout = (Args) => Partial<LayoutResult>

export default ((
  _,
  { cols = defaultCols, layout }: Args
): Partial<LayoutResult> => ({
  id,
  cols,
  data: JSON.parse(layout)
})) as Resolver
