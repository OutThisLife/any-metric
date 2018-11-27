import { BoxProps } from '@/components/Box'
import Text from '@/components/Text'
import { BaphoTheme, createTextGradient } from '@/theme'
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
  <Text fontFamily={theme.fonts.family.title} {...props}>
    {title.split(' ').map((w, i) => (
      <Text
        key={Math.random()}
        is="div"
        backgroundImage={createTextGradient(
          i === 0 ? theme.colours.base : theme.colours.muted,
          0.1
        )}
        font="inherit"
        marginLeft={i && 8}>
        {w}
      </Text>
    ))}

    {cta()}
  </Text>
))

export interface HeadingProps extends BoxProps<HTMLHeadingElement> {
  title?: string
  cta?: (props?: any) => JSX.Element
}
