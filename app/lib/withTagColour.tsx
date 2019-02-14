import { Tag } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import md5 from 'md5'
import { darken, shade } from 'polished'
import { compose, mapProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default () =>
  compose<TagColour & Tag & BaphoTheme, Tag>(
    setDisplayName('with-tag-colour'),
    withTheme,
    mapProps<TagColour, Tag & TagColour>(({ title, ...props }) => ({
      title,
      tagColours: getTagColours(title),
      ...props
    }))
  )

export const getTagColours = (str: string): ColourHash => {
  const bg = `#${md5(str).slice(0, 6)}`
  const border = darken(0.15, bg)
  const colour = shade(0.5, bg)

  return { bg, colour, border }
}

export interface TagColour extends BaphoTheme {
  tagColours: ColourHash
}

interface ColourHash {
  hash?: string
  colour?: string
  border?: string
  bg?: string
}
