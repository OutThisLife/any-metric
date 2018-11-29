import { compose, defaultProps, setDisplayName } from 'recompose'

import { Cols, ColumnProps } from '..'

export default compose<ColumnProps, ColumnProps>(
  defaultProps<ColumnProps>({
    name: 'date',
    flex: 'unset',
    flexBasis: 100,
    textAlign: 'center'
  }),
  setDisplayName('col-datetime')
)(Cols)
