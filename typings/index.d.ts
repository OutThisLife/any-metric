import { Dayjs } from 'dayjs'
import { ThemeProps } from 'styled-components'

declare module '*.scss'
declare module '*.svg'

declare type DynamicComponent<P> = React.ComponentType<P> &
  LoadableExport.LoadableComponent

declare interface DataPoint {
  x: Dayjs
  y: number
}

declare type BaphoTheme<T = { [key: string]: any }> = ThemeProps<{
  colours: T
  fonts: T
  inputs: T
}>
