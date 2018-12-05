import { BoxProps } from 'rebass'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Tag from './style'

export default compose<TagProps, TagProps>(
  setDisplayName('tag'),
  defaultProps({
    as: 'label'
  })
)(Tag)

export type TagProps = BoxProps & any
