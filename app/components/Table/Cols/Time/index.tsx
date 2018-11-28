import { compose, defaultProps, setDisplayName } from 'recompose'

import { Cols, ColumnProps } from '..'

export default compose<ColumnProps, ColumnProps>(
  defaultProps<ColumnProps>({
    name: 'date',
    flex: 2.2,
    textAlign: 'center'
  }),
  setDisplayName('col-datetime')
)(Cols)
