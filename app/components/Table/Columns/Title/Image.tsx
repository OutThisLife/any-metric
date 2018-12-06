import Popover from '@/components/Popover'
import { FakeResult } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export default compose<FakeResult, FakeResult>(setDisplayName('col-title-img'))(
  ({ id, title, image }) => (
    <Popover
      id={`popover-${id}`}
      direction="right"
      render={() => <img src={image} alt={title} />}>
      {({ toggle }) => (
        <Box
          as="figure"
          css={`
            cursor: zoom-in;
          `}>
          <img
            src={image}
            alt={title}
            onMouseEnter={() => toggle(true)}
            onMouseLeave={() => toggle(false)}
          />
        </Box>
      )}
    </Popover>
  )
)
