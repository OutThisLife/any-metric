import { Button } from '@/components/Form'
import Text from '@/components/Text'
import { BaphoTheme } from '@/theme'
import { HeadingProps as BaseHeadingProps } from 'rebass'
import { compose, defaultProps, setDisplayName, withProps } from 'recompose'
import { withTheme } from 'styled-components'

import Heading from './style'

export default compose<
  HeadingProps & BaphoTheme & { title: string[] },
  HeadingOutterProps
>(
  defaultProps<HeadingProps>({
    as: 'h2',
    fontWeight: '300',
    fontSize: 24,
    lineHeight: 1.5,
    letterSpacing: -0.69,
    m: 0
  }),
  withProps<{ title: string[] }, { title: string }>(({ title }) => ({
    title: title.split(' ').slice(0, 2)
  })),
  withTheme,
  setDisplayName('heading')
)(({ theme, title, cta, ...props }) => (
  <Heading {...props} css="display: flex; alignItems: center">
    {title.map((w, i) => (
      <Text
        key={w}
        fontWeight="100"
        fontSize={24}
        color={i === 1 ? theme.colours.muted : theme.colours.base}>
        {w}
      </Text>
    ))}

    {cta && <Button variant="basic | pill">{cta}</Button>}
  </Heading>
))

export interface HeadingProps extends BaseHeadingProps {
  as?: any
  cta?: string | JSX.Element
}

export interface HeadingOutterProps extends HeadingProps {
  title?: string
}
