import { BoxProps } from '@/components/Box'
import { BaphoTheme } from '@/theme'
import { Text } from 'evergreen-ui'
import { compose, defaultProps, mapProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<TextProps & BaphoTheme, TextProps>(
  setDisplayName('text'),
  defaultProps({
    is: 'span',
    display: 'inline-block'
  }),
  withTheme,
  mapProps<TextProps, TextProps & BaphoTheme>(
    ({ theme, color = theme.colours.muted, ...props }) => ({
      color,
      ...props
    })
  )
)(Text)

export type TextProps = BoxProps<HTMLParagraphElement>
