declare module '*.scss'
declare module '*.svg'

declare type DynamicComponent<P> = React.ComponentType<P> & LoadableExport.LoadableComponent
