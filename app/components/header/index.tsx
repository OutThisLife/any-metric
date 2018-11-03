import Button from '@/components/button'
import Header from '@/components/header/style'
import Logo from '@/components/logo'
import theme from '@/theme'
import { compose, setDisplayName } from 'recompose'

import AddNew from './addNew'
import Controls from './controls'
import Nav from './nav'

export default compose(setDisplayName('header'))(() => (
  <Header>
    <div>
      <Logo />
    </div>

    <nav>
      <Controls />
      <Nav />

      <div>
        <AddNew>
          <Button
            appearance="minimal"
            color={theme.colours.base}
            title="Create View"
          />
        </AddNew>

        <AddNew>
          <Button title="Add Pod" />
        </AddNew>
      </div>
    </nav>
  </Header>
))
