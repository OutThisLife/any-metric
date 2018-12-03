import { spawn } from '@/lib/utils'
import { FakeResult } from '@/server/schema/types'
import fz from 'fuzzaldrin-plus'

export const worker: PodWorker =
  'browser' in process &&
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

      switch (action) {
        case 'RESET':
          this.postMessage(data)
          break

        case 'TAG':
          const filtered = e.data[2]
            .split(';')
            .reduce((acc, tg) => {
              const tags = tg.split(',')
              const main = tags.shift()

              data
                .filter(
                  d =>
                    d.tags.includes(main) &&
                    (tags.length ? d.tags.some(t => tags.includes(t)) : true)
                )
                .map(d => acc.push(d))

              return acc
            }, [])
            .filter((d, i, s) => s.indexOf(d) === i)

          this.postMessage(filtered)

          break
      }
    }
  })

export const isWorkerReady = () =>
  'browser' in process && worker instanceof Worker

export interface PodWorker extends Worker {
  importScripts?: (s: string) => void
  fuzzaldrin?: typeof fz
}

export default worker
