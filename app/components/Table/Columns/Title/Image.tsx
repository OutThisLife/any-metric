import Modal from '@/components/Modal'
import { FakeResult } from '@/server/schema/types'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

export default compose<FakeResult, FakeResult>(setDisplayName('col-title-img'))(
  ({ title, image }) => (
    <Modal
      render={() => (
        <Box
          as="div"
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--pad);
          `}>
          <Box
            as="figure"
            m={0}
            css={`
              grid-column: 1;
            `}>
            <img src="https://placeimg.com/640/480/any" alt={title} />
          </Box>

          <Box
            css={`
              grid-column: 2 / -1;
              display: grid;
              grid-template-columns: repeat(auto-fill,minmax(80px,1fr))
              grid-auto-rows: 40px;
              grid-gap: var(--pad);

              img {
                grid-row-end: span 2;
                width: 100%;
              }
            `}>
            <img src={image} width={25} alt={title} />
            <img src={image} width={25} alt={title} />
            <img src={image} width={25} alt={title} />
            <img src={image} width={25} alt={title} />
            <img src={image} width={25} alt={title} />
            <img src={image} width={25} alt={title} />
          </Box>
        </Box>
      )}>
      {({ isOpen, toggle }) => (
        <Box as="figure">
          <img
            src={image}
            data-src={image}
            alt={title}
            onClick={() => toggle(!isOpen)}
          />
        </Box>
      )}
    </Modal>
  )
)
