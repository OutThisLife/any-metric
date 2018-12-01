import Box, { BoxProps } from '@/components/Box'
import Text from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { compose, defaultProps, setDisplayName } from 'recompose'
import { withTheme } from 'styled-components'

export default compose<HeadingProps & BaphoTheme, HeadingProps>(
  defaultProps<HeadingProps>({
    is: 'h2',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 300,
    fontSize: '2rem',
    lineHeight: 1.5,
    letterSpacing: '-0.03em',
    margin: 0,
    cta: () => null
  }),
  withTheme,
  setDisplayName('heading')
)(({ theme, title, cta, ...props }) => (
  <Box display="inline-flex" alignItems="center">
    {title
      .split(' ')
      .slice(0, 2)
      .map((w, i) => (
        <Text
          key={w}
          fontWeight={100}
          fontSize="2rem"
          paddingLeft={i * 8}
          color={i === 1 ? theme.colours.muted : theme.colours.base}
          {...props}>
          {w}
        </Text>
      ))}

    {cta()}
  </Box>
))

export interface HeadingProps extends BoxProps<HTMLHeadingElement> {
  title?: string
  cta?: (props?: any) => JSX.Element
}
