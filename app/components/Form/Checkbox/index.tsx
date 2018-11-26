import Box from '@/components/Box'
import { compose, setDisplayName } from 'recompose'

import Checkbox from './style'

export default compose<CheckboxProps, CheckboxProps>(
  setDisplayName('checkbox')
)(props => (
  <Checkbox>
    <Box is="input" type="checkbox" {...props} />
    <div />
  </Checkbox>
))

export type CheckboxProps = { [key: string]: any } & React.HTMLAttributes<
  HTMLInputElement
>
