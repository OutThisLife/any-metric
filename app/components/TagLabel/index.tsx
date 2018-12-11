import withTagColour, { TagColour } from '@/lib/withTagColour'
import { Tag } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import TagLabel from './style'

export default compose<TagState & TagProps, TagProps>(
  setDisplayName('tag'),
  withTagColour()
)(({ title, slug, tagColours: { bg, colour, border } }) => (
  <TagLabel
    as="label"
    aria-label={slug}
    style={{
      color: colour,
      borderColor: border,
      background: bg
    }}>
    {title}
  </TagLabel>
))

type TagState = BaphoTheme & TagColour

export interface TagProps extends BoxProps, Tag {
  as?: any
}
