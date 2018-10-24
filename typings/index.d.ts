import { Dayjs } from 'dayjs'

declare module '*.scss'
declare module '*.svg'

declare type DynamicComponent<P> = React.ComponentType<P> &
  LoadableExport.LoadableComponent

declare interface DataPoint {
  x: Dayjs
  y: number
}
