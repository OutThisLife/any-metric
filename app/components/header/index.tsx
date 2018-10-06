import Button from '@/components/button'
import Header from '@/components/header/style'
import Logo from '@/components/logo'
import { setDisplayName } from 'recompose'

import Controls from './controls'
import Nav from './nav'

export default setDisplayName('header')(() => (
  <Header>
    <div>
      <Logo />
    </div>

    <nav>
      <Controls />
      <Nav />

      <div>
        <Button title="Create View" />
        <Button variant="primary" title="Add Pod" />
      </div>
    </nav>
  </Header>
))
