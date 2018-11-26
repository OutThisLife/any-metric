import Form from '@/components/Form'
import { CheckboxProps } from '@/components/Form/Checkbox'
import { compose, defaultProps, withProps } from 'recompose'

import { Cols, Props } from '..'

export default compose<CheckProps, CheckProps>(
  defaultProps({
    checkboxProps: {}
  }),
  withProps({
    flex: 0.7,
    flexBasis: 'auto',
    overflow: 'visible'
  })
)(({ checkboxProps, ...props }) => (
  <Cols {...props}>
    <Form.Checkbox {...checkboxProps} />
  </Cols>
))

type CheckProps = Props & { checkboxProps?: CheckboxProps }
