import { Product } from '@/server/schema/types'
import { IoMdImage } from 'react-icons/io'
import { Box, Flex } from 'rebass'
import { compose } from 'recompose'

import Text from '../Text'

export default compose<Product, Product>()(item => (
  <Flex>
    <Box
      as="figure"
      css={`
        margin: 0;
        padding: 0;
      `}>
      {item.image ? <img src={item.image} /> : <IoMdImage />}
    </Box>

    <Box as="aside">
      <Text as="a" href={item.url} target="_blank" rel="noopener">
        {item.title}
      </Text>
    </Box>
  </Flex>
))
