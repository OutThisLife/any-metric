import { BoxProps } from '@/components/Box'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Heading from './style'

export default compose<HeadingProps, HeadingProps>(
  defaultProps<HeadingProps>({
    is: 'h2',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '2rem',
    letterSpacing: '-0.03em',
    cta: () => null
  }),
  setDisplayName('heading')
)(({ title, cta, ...props }) => (
  <Heading {...props}>
    {title.split(' ').map(w => (
      <span key={Math.random()}>{w}</span>
    ))}

    {cta()}
  </Heading>
))

export interface HeadingProps extends BoxProps<HTMLHeadingElement> {
  title?: string
  cta?: () => JSX.Element
}
