import { Dayjs } from 'dayjs'

declare module '*.scss'
declare module '*.svg'

export type DynamicComponent<P> = React.ComponentType<P> &
  LoadableExport.LoadableComponent

export type DataPoint = {
  x: Dayjs
  y: number
}

declare interface IObject {
  [key: string]: any
}
