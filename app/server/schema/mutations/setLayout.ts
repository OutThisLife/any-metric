import { cols as defaultCols, id } from '../queries/layout'
import { LayoutResult, Resolver } from '../types'

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
