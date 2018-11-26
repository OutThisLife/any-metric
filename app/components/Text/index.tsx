import { BoxProps } from '@/components/Box'
import { compose, setDisplayName } from 'recompose'

import Text from './style'

export default compose<TextProps, TextProps>(setDisplayName('text'))(props => (
  <Text display="inline-block" {...props} />
))

export type TextProps = BoxProps<HTMLParagraphElement>
