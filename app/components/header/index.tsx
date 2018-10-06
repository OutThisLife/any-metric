import Button from '@/components/button'
import Logo from '@/components/logo'

import Header from './styled'

export default () => (
  <Header>
    <div>
      <Logo />
    </div>

    <nav>
      <div>
        <a href="javascript:;" className="active">
          All Views <sup>(12)</sup>
        </a>

        <a href="javascript:;">Social <sup>(2)</sup></a>
        <a href="javascript:;">Finance <sup>(20)</sup></a>
      </div>

      <div>
        <Button title="Create View" />
        <Button variant="primary" title="Add Pod" />
      </div>
    </nav>
  </Header>
)
