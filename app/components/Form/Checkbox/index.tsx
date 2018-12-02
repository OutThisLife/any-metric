import { compose, setDisplayName } from 'recompose'

import { Input, InputProps } from '../Input'
import Checkbox from './style'

export default compose<CheckboxProps, CheckboxProps>(
  setDisplayName('checkbox')
)(props => (
  <Checkbox>
    <Input type="checkbox" {...props} />
    <div style={{ cursor: 'pointer' }} />
  </Checkbox>
))

export type CheckboxProps = InputProps & React.HTMLAttributes<HTMLInputElement>
