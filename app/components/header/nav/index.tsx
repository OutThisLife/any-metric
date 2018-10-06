import { setDisplayName } from 'recompose'

import Nav from './style'

export default setDisplayName('header-nav')(() => (
  <Nav>
    <a href="javascript:;" className="active">
      All Views <sup>(12)</sup>
    </a>

    <a href="javascript:;">
      Social <sup>(2)</sup>
    </a>

    <a href="javascript:;">
      Finance <sup>(20)</sup>
    </a>
  </Nav>
))
