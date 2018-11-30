import Form, { CheckboxProps } from '@/components/Form'
import { compose, defaultProps, setDisplayName } from 'recompose'

import { Cols, ColumnProps } from '..'

export default compose<CheckProps, CheckProps>(
  defaultProps<CheckProps>({
    name: 'id',
    flex: 'unset',
    flexBasis: 30,
    padding: 0,
    overflow: 'visible'
  }),
  setDisplayName('col-checkbox')
)(({ checkboxProps = {}, ...props }) => (
  <Cols {...props}>
    <Form.Checkbox {...checkboxProps} />
  </Cols>
))

interface CheckProps extends ColumnProps {
  checkboxProps?: CheckboxProps
}
