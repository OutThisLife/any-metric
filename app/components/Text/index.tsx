import { BoxProps } from '@/components/Box'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Text from './style'

export default compose<TextProps, TextProps>(
  defaultProps({
    is: 'span',
    display: 'inline-block'
  }),
  setDisplayName('text')
)(Text)

export type TextProps = BoxProps<HTMLParagraphElement>
