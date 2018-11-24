import { SearchInput } from 'evergreen-ui'
import { compose, setDisplayName } from 'recompose'

import Search from './style'

export default compose<{}, {}>(setDisplayName('search'))(() => (
  <Search method="get" action="javascript:;">
    <SearchInput type="search" placeholder="Add new product" />
  </Search>
))
