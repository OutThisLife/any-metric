declare module '*.scss'
declare module '*.svg'

declare interface IObject {
  [key: string]: any
}

declare interface Item {
  id: string
  title: string
  url: string
  hostname: string
  data: IObject
}
