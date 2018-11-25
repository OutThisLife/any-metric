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

declare type BaphoTheme = ThemeProps<{
  colours: {
    [key: string]: any
  }

  fonts: {
    [key: string]: any
  }

  [key: string]: any
}>
