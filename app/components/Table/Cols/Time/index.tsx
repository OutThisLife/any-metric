import { compose, setDisplayName, withProps } from 'recompose'

import { Cols, ColumnProps } from '..'

export default compose<ColumnProps, ColumnProps>(
  withProps<ColumnProps, ColumnProps>({
    name: 'date',
    flex: 2.2,
    textAlign: 'center'
  }),
  setDisplayName('col-datetime')
)(Cols)
