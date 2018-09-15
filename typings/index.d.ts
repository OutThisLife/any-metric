declare module '*.scss'
declare module '*.svg'

export declare interface IObject {
  [key: string]: any
}

export declare interface Item {
  id: string
  title: string
  meta: IObject
  url: string
  hostname: string
  data: IObject
}
