import { Resolver } from '../types'

export interface LayoutResult {
  id: number | string
  cols: number
  data: ReactGridLayout.Layout[]
}

export const cols = 40
export const gridFactor = 2
export const listFactor = 10
export const id = cols * gridFactor * listFactor

export default ((): LayoutResult => ({
  id,
  cols,
  data: [
    {
      i: 'a',
      x: cols / listFactor,
      y: 0,
      w: cols - (cols / listFactor) * 2,
      h: cols / 3.5,
      maxH: cols
    },
    {
      i: 'b',
      x: cols / listFactor,
      y: 1,
      w: cols - (cols / listFactor) * 2,
      h: cols / 3.5,
      maxH: cols
    }
  ]
})) as Resolver
