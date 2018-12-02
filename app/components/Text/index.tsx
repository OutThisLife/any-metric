import { Text, TextProps as BaseTextProps } from 'rebass'
import { compose, defaultProps, setDisplayName } from 'recompose'

export default compose<BaseTextProps, TextProps>(
  setDisplayName('text'),
  defaultProps<BaseTextProps>({
    as: 'span',
    css: `
      display: 'inline-block'
    `
  })
)(Text)

export type TextProps = BaseTextProps & React.AllHTMLAttributes<HTMLElement>
