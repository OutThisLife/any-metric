import { compose, setDisplayName } from 'recompose'

import Tag from './style'

export default compose(setDisplayName('tag'))(({ children }) => (
  <Tag as="label">{children}</Tag>
))
