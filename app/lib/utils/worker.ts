export const spawn = (fn: () => any): Worker =>
  new Worker(URL.createObjectURL(new Blob([`(${fn})()`])))
