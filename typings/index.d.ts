import { LoadableComponent } from 'react-loadable'

declare module '*.scss'
declare module '*.svg'

declare type DynamicComponent = React.ComponentType<any> & LoadableComponent
