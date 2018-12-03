import { FakeResult } from '@/server/schema/types'
import { MdOpenInNew } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'

export default compose<FakeResult, FakeResult>(
  setDisplayName('col-title-copy')
)(({ title, copy, slug }) => (
  <Box
    pl={12}
    pr={12}
    css={`
      position: relative;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    `}>
    <a
      href={slug}
      target="_blank"
      rel="noopener"
      style={{
        zIndex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }}
    />

    <Text as="a" href={slug} fontWeight="500">
      {title} <MdOpenInNew />
    </Text>

    <Text
      as="p"
      css={`
        display: inline-block;
        color: ${({ theme }) => theme.colours.muted};
        font-size: 0.9em;
        white-space: nowrap;
        margin: 0;
      `}>
      {copy}
    </Text>
  </Box>
))
