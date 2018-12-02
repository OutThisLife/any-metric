import * as Form from '@/components/Form'
import { CheckboxProps } from '@/components/Form/Checkbox'
import { compose, defaultProps, setDisplayName } from 'recompose'

import Column, { ColumnProps } from '../Column'

export default compose<CheckProps, CheckProps>(
  setDisplayName('col-checkbox'),
  defaultProps<CheckProps>({
    name: 'id'
  })
)(({ checkboxProps = {} }) => (
  <Column
    p={0}
    css={`
      width: calc(var(--offset));
      text-align: center;
    `}>
    <Form.Checkbox {...checkboxProps} />
  </Column>
))

interface CheckProps extends ColumnProps {
  checkboxProps?: CheckboxProps
}
