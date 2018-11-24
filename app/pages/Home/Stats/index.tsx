import Box from '@/components/Box'
import { Loading } from '@/lib/queries'
import { FakeCrawlResult } from '@/server/schema/types'
import dynamic from 'next/dynamic'
import { compose, setDisplayName } from 'recompose'

const [GetChart]: any[] = (() => {
  const loading = () => <Loading style={{ padding: '5vw 0' }} />
  const list = {
    price: dynamic({
      ssr: false,
      loader: () => import(/* webpackChunkName: "PriceChart" */ './Price'),
      loading,
      webpack: ['./price']
    } as any)
  }

  return [
    ({ template, ...props }) => {
      if (template in list) {
        const C = list[template]
        return <C key={template} {...props} />
      }

      console.error(props, 'not in', list)

      return null
    },
    Object.keys(list)
  ]
})()

export default compose<TOutter, TOutter>(setDisplayName('stats'))(
  ({ data, ...props }) => (
    <Box display="flex" alignItems="center" justifyContent="center" {...props}>
      <GetChart template="price" data={data} />
    </Box>
  )
)

interface TOutter extends React.CSSProperties {
  data: FakeCrawlResult[]
}
