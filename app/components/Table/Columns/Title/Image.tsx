import { FakeResult } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export default compose<FakeResult, FakeResult>(setDisplayName('col-title-img'))(
  ({ title, image }) => (
    <Box as="figure">
      <img src={image} data-src={image} alt={title} />
    </Box>
  )
)
