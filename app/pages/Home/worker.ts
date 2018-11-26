import { spawn } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import fz from 'fuzzaldrin-plus'

export const worker: PodWorker =
  typeof window !== 'undefined' &&
  spawn(function(this: PodWorker) {
    if (typeof this.importScripts !== 'function') {
      return
    }

    this.importScripts(
      'https://cdn.jsdelivr.net/npm/fuzzaldrin-plus@0.6.0/dist-browser/fuzzaldrin-plus.min.js'
    )

    this.onmessage = e => {
      const data: FakeResult[] = e.data[0]
      const action: string = e.data[1]
      const value: string = e.data[2]

      switch (action) {
        case 'RESET':
          this.postMessage(data)
          break

        case 'TAG':
          this.postMessage(data.filter(d => d.tags.includes(value)))
          break

        case 'SEARCH':
          this.postMessage(
            this.fuzzaldrin.filter(data, value, { key: 'title' })
          )
          break
      }
    }
  })

export const isWorkerReady = () =>
  typeof window !== 'undefined' && worker instanceof Worker

export interface PodWorker extends Worker {
  importScripts?: (s: string) => void
  fuzzaldrin?: typeof fz
}

export default worker
