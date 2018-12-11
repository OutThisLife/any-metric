import { Tag } from '@/server/schema/types'
import { BaphoTheme } from '@/theme'
import { darken, lighten, mix, tint } from 'polished'
import { compose, mapProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default () =>
  compose<TagColour & Tag, Tag>(
    setDisplayName('with-tag-colour'),
    withTheme,
    mapProps<TagColour, Tag & TagColour>(({ theme, title, ...props }) => ({
      title,
      tagColours: getTagColours(title, theme.colours.secondary),
      ...props
    }))
  )

export const getTagColours = (str: string, secondary: string): ColourHash => {
  const hash = mix(0.25, getColourHash(str), secondary)

  const bg = darken(0.25, hash)
  const colour = lighten(0.1, tint(0.2, bg))
  const border = tint(0.05, bg)

  return { hash, bg, colour, border }
}

export const getColourHash = (str: string): string => {
  const rgb: string[] = []

  str = [...str].map(c => (/[0-9A-Fa-f]/g.test(c) ? c : 0)).join('')

  while (str.length % 3) {
    str += '0'
  }

  for (let i = 0, l = str.length; i < l; i += str.length / 3) {
    rgb.push(str.slice(i, i + str.length / 3))
  }

  return `#${rgb.map(s => s.slice(0, 2)).join('')}`
}

export interface TagColour extends BaphoTheme {
  tagColours: ColourHash
}

interface ColourHash {
  hash: string
  colour: string
  border: string
  bg: string
}
