import { Link } from 'evergreen-ui'
import { setDisplayName } from 'recompose'

import Nav from './style'

export default setDisplayName('header-nav')(() => (
  <Nav>
    <Link size={300} href="javascript:;" className="active">
      All Views <sup>(12)</sup>
    </Link>

    <Link size={300} href="javascript:;">
      Social <sup>(2)</sup>
    </Link>

    <Link size={300} href="javascript:;">
      Finance <sup>(20)</sup>
    </Link>
  </Nav>
))
