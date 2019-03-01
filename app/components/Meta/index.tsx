import { Product } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, mapProps, setDisplayName } from 'recompose'

export default compose<MetaProps, MetaRenderProps>(
  setDisplayName('meta'),
  mapProps<MetaProps, MetaRenderProps>(({ data: initialData = [] }) => {
    const data = [].slice.call(initialData).sort((a, b) => b.close - a.close)

    return {
      high: data[0].close.toFixed(2),
      low: data[data.length - 1].close.toFixed(2),
      avg: (data.reduce((acc, d) => (acc += d.close), 0) / data.length).toFixed(
        2
      )
    }
  })
)(({ high, low, avg }) => (
  <Box
    css={`
      display: flex;
      justify-content: space-evenly;
      font-size: 11px;

      strong {
        margin: 0 0.3em 0 0;
      }
    `}>
    <div>
      <strong>H:</strong>${high}
    </div>

    <div>
      <strong>A:</strong>${avg}
    </div>

    <div>
      <strong>L:</strong>${low}
    </div>
  </Box>
))

export interface MetaProps extends MetaRenderProps {
  high: string
  avg: string
  low: string
}

export interface MetaRenderProps {
  data?: Product[]
}
