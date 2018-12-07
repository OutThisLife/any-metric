import { Button } from '@/components/Form'
import Text from '@/components/Text'
import { HeadingProps as BaseHeadingProps } from 'rebass'
import { compose, defaultProps, setDisplayName, withProps } from 'recompose'

import Heading from './style'

export default compose<HeadingProps & { title: string[] }, HeadingProps>(
  setDisplayName('heading'),
  defaultProps<HeadingProps>({
    as: 'h2',
    title: '',
    cta: '',
    fontWeight: '300',
    lineHeight: 1.5,
    letterSpacing: -0.69,
    m: 0
  }),
  withProps<{ title: string[] }, { title: string }>(({ title }) => ({
    title: title
      .split(' ')
      .slice(0, 2)
      .filter(t => t.length)
  }))
)(({ title, cta, ...props }) => (
  <Heading {...props}>
    {title.length
      ? title.map(w => (
          <Text key={w} fontWeight="100">
            {w}
          </Text>
        ))
      : null}

    {cta && <Button variant="basic | pill">{cta}</Button>}
  </Heading>
))

export interface HeadingProps extends BaseHeadingProps {
  as?: any
  title?: string
  cta?: string | JSX.Element
}
