import { Button } from '@/components/Form'
import Text from '@/components/Text'
import { HeadingProps as BaseHeadingProps } from 'rebass'
import { compose, defaultProps, setDisplayName, withProps } from 'recompose'

import Heading from './style'

export default compose<HeadingProps & { title: string[] }, HeadingOutterProps>(
  setDisplayName('heading'),
  defaultProps<HeadingProps>({
    as: 'h2',
    fontWeight: '300',
    lineHeight: 1.5,
    letterSpacing: -0.69,
    m: 0
  }),
  withProps<{ title: string[] }, { title: string }>(({ title }) => ({
    title: title.split(' ').slice(0, 2)
  }))
)(({ title, cta, ...props }) => (
  <Heading
    {...props}
    css={`
      display: flex;
      alignitems: center;
      font-size: 1.8rem;
      line-height: 2;
    `}>
    {title.map(w => (
      <Text key={w} fontWeight="100">
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
