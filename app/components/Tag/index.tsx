import withTagColour, { TagColour } from '@/lib/withTagColour'
import { BaphoTheme } from '@/theme'
import { BoxProps } from 'rebass'
import { compose, setDisplayName } from 'recompose'

import Tag from './style'

export default compose<TagState & TagProps, TagProps>(
  setDisplayName('tag'),
  withTagColour()
)(({ title, tagColours: { bg, colour, border } }) => (
  <Tag
    as="label"
    aria-label={title}
    style={{
      color: colour,
      borderColor: border,
      background: bg
    }}>
    {title}
  </Tag>
))

type TagState = BaphoTheme & TagColour

export interface TagProps extends BoxProps {
  as?: any
  title: string
}
