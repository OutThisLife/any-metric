import Tag from '@/components/Tag'
import { FakeResult } from '@/server/schema/types'
import { MdOpenInNew } from 'react-icons/md'
import { Box } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import { Text } from '../../style'

export default compose<FakeResult, FakeResult>(
  setDisplayName('col-title-copy')
)(({ title, slug, tags = [] }) => (
  <Box>
    {tags.length && (
      <Box>
        <Tag
          css={`
            font-weight: 600;
            text-transform: uppercase;
          `}>
          {tags[0]}
        </Tag>
      </Box>
    )}

    <Text
      as="a"
      href={slug}
      css={`
        font-weight: 600;
        font-size: 1.3rem;
        line-height: 1;
      `}>
      {title} <MdOpenInNew />
    </Text>

    {tags.length && (
      <Box>
        {tags
          .filter((_, i) => i)
          .map(t => (
            <Tag key={t}>{t}</Tag>
          ))}
      </Box>
    )}
  </Box>
))
