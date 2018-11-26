import Form, { CheckboxProps } from '@/components/Form'
import { compose, setDisplayName, withProps } from 'recompose'

import { Cols, ColumnProps } from '..'

export default compose<CheckProps, CheckProps>(
  withProps<CheckProps, CheckProps>(() => ({
    flex: 0.7,
    flexBasis: 'auto',
    overflow: 'visible'
  })),
  setDisplayName('col-checkbox')
)(({ checkboxProps = {}, ...props }) => (
  <Cols {...props}>
    <Form.Checkbox {...checkboxProps} />
  </Cols>
))

interface CheckProps extends ColumnProps {
  checkboxProps?: CheckboxProps
}
