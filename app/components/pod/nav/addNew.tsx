import Button from '@/components/button'
import SideSheet from '@/components/sideSheet'
import { Heading } from 'evergreen-ui'
import { IoMdFunnel } from 'react-icons/io'
import { compose, setDisplayName, withState } from 'recompose'

export default compose(
  setDisplayName('add-new'),
  withState('isShown', 'toggle', false)
)(() => (
  <SideSheet render={() => <Heading>Some content</Heading>}>
    {({ isShown, toggle }) => (
      <Button
        title="New Label"
        iconBefore={<IoMdFunnel />}
        onClick={() => toggle(!isShown)}
      />
    )}
  </SideSheet>
))
