import Box from '@/components/Box'
import { compose, setDisplayName } from 'recompose'

import Search from './Search'
import Header from './style'

export default compose(setDisplayName('header'))(() => (
  <Header
    is="header"
    zIndex={10}
    display="grid"
    gridTemplateColumns="min-content 1fr"
    alignItems="center"
    height={50}>
    <Box paddingX="var(--pad)">
      <h1>
        <span>baphometric</span>
      </h1>
    </Box>

    <Box>
      <Search />
    </Box>
  </Header>
))
