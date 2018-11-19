import { Link } from 'evergreen-ui'
import { compose, setDisplayName } from 'recompose'

import Nav from './style'

export default compose(setDisplayName('header-nav'))(() => (
  <Nav>
    <Link size={300} href="javascript:;" className="active">
      All
    </Link>

    <Link size={300} href="javascript:;">
      Social
    </Link>

    <Link size={300} href="javascript:;">
      Finance
    </Link>
  </Nav>
))
