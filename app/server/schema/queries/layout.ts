import { LayoutResult, Resolver } from '../types'

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
      minW: 0,
      maxW: cols,
      minH: 0,
      maxH: cols,
      moved: false,
      static: false,
      isDraggable: true,
      isResizable: true
    }
  ]
})) as Resolver
