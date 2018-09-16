declare namespace Baph {
  interface Selector {
    parent?: string
    name: string
    el: string
  }

  interface Result {
    err?: string
    id: number
    title: string
    img?: string
    url: string
    hostname: string
    meta?: any
    data?: any
  }
}
